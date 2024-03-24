'use server'
import Question from '@/database/question.model'
import { connectionToDatabase } from '../mongoose'
import Tag from '@/database/tags.question'
import mongoose, { FilterQuery } from 'mongoose'
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetAnswersParams,
  GetAuthor,
  GetQuestionsParams,
  QuestionVoteParams
} from './shared.types'
import User from '@/database/user.question'
import { revalidatePath } from 'next/cache'
import Answer from '@/database/answer.model'
import Interaction from '@/database/interaction.model'
import Blog from '@/database/blog.model'

/**
 *
 * @param params query
 * @returns questons and blogpost
 *
 * @todo so let get questions and blog post and mix them togethar and sort
 * @todo sorting the shet
 */
export async function getQuestions (params: GetQuestionsParams) {
  try {
    connectionToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 5 } = params
    // calculate the number of the posts to skip
    const skipAmount = (page - 1) * pageSize

    const questionQuery: FilterQuery<typeof Question> = {}
    const blogQuery: FilterQuery<typeof Blog> = {}

    if (searchQuery) {
      questionQuery.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } }
      ]
      blogQuery.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    }

    let sortOptions = {}
    let items
    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1 }

        break
      case 'frequent':
        sortOptions = { views: -1 }
        break

      case 'unanswered':
        questionQuery.answers = { $size: 0 }
        break
      case 'solved':
        questionQuery.answered = { $size: 1 }
        break
      default:
        break
    }

    const question = await Question.find(questionQuery)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User }).skip(skipAmount).limit(pageSize)
      .sort(sortOptions)

    const blogpost = await Blog.find(blogQuery)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User }).skip(skipAmount).limit(pageSize)
      .sort(sortOptions)

    if (filter === 'questions') {
      items = question
    }
    if (filter === 'blogpost') {
      items = blogpost
    } else {
      items = [...question, ...blogpost]
    }

    const questionAmount = await Question.countDocuments(questionQuery)
    const blogAmount = await Blog.countDocuments(blogQuery)

    const totalItem = questionAmount + blogAmount

    const isNext = totalItem > skipAmount + items.length

    return { items, isNext }
  } catch (error) {
    console.log(error)
  }
}

export async function isQuestionAuthor (params : GetAuthor) {
  try {
    // Fetch the question
    const { questionid, userid } = params
    const question = await Question.findById(questionid).populate({
      path: 'author',
      model: User,
      select: 'clerkId'
    })

    // If the question doesn't exist, return false
    if (!question) {
      return false
    }
    const author = question.author.clerkId === userid

    return author
  } catch (error) {
    console.error('Error checking question author:', error)
    throw error
  }
}

export async function createQuestion (params: CreateQuestionParams) {
  try {
    connectionToDatabase()

    // eslint-disable-next-line no-unused-vars
    const { title, content, tags, author, type, path } = params

    const question = await Question.create({
      title,
      content,
      tags: [], // Initialize tags as an empty array
      author,
      type
    })

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )
      tagDocuments.push(existingTag._id)
    }

    // Convert tagDocuments to an array of ObjectId using the new keyword
    const tagsAsObjectId = tagDocuments.map(
      (tagId) => new mongoose.Types.ObjectId(tagId)
    )

    await Question.findByIdAndUpdate(
      question._id,
      {
        $push: { tags: { $each: tagsAsObjectId } }
      },
      { new: true }
    )
    // creating an ineraction for the record of users who asked questions
    await Interaction.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagDocuments

    })
    // increment the authors reputation by 5 for creating the  damn quesiton
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}

export async function getQuestionsById (params: GetAnswersParams) {
  try {
    connectionToDatabase()
    const { questionId } = params

    const question = await Question.findById(questionId)
      .populate({
        path: 'tags',
        model: Tag,
        select: '_id name'
      })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture'
      })

    return question
  } catch (error) {}
}

/**
 *
 * @param params questiond userid(who upvoted or downvote)
 * @todo increament on updvote , and give user point
 * @abstract author can upvote but wont get rep points
 * @argument auhtor id and user id match so its the author who upvoting himself
 */
export async function upvoteQuestion (params: QuestionVoteParams) {
  try {
    connectionToDatabase()

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // const questionAuthor = question.author

    // increament the auhtor reputation by some point
    if (question.author.toString() === userId) {
      // console.log(question.author, userId)
      await User.findByIdAndUpdate(userId, { $inc: { reputation: hasupVoted ? -1 : 1 } })
      await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasupVoted ? -1 : 1 } })
    }
    // increase reputation on comment is upvoted
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasupVoted ? -2 : 2 } })
    // increase rep question author on upvote
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasupVoted ? -10 : 10 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteQuestion (params: QuestionVoteParams) {
  try {
    connectionToDatabase()

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downvote: userId } }
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // increament the auhtor reputation by some point
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasdownVoted ? 2 : -2 } })

    await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasdownVoted ? 10 : -10 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteQuestions (params:DeleteQuestionParams) {
  try {
    connectionToDatabase()

    const { questionId, path } = params

    await Question.deleteOne({ _id: questionId })
    await Answer.deleteMany({ question: questionId })
    await Interaction.deleteMany({ question: questionId })
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function editQuestions (params:EditQuestionParams) {
  try {
    connectionToDatabase()

    const { questionId, path, title, content } = params

    const question = await Question.findById(questionId)

    if (!question) throw new Error('Question not found')

    question.title = title
    question.content = content

    await question.save()

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getHotQuestions () {
  try {
    connectionToDatabase()

    const Questions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5)
    const Blogs = await Blog.find({})
      .sort({ views: -1 })
      .limit(5)

    const topQuestions = [...Questions, ...Blogs].sort((a, b) => {
      if (a.views > b.views) return -1
      if (a.views < b.views) return 1
      return 0
    }).slice(0, 5)

    return topQuestions
  } catch (error) {
    console.log(error)
    throw error
  }
}
