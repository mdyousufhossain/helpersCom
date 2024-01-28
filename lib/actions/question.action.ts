'use server'
import Question from '@/database/question.model'
import { connectionToDatabase } from '../mongoose'
import Tag from '@/database/tags.question'
import mongoose from 'mongoose'
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetAnswersParams,
  GetQuestionsParams,
  QuestionVoteParams
} from './shared.types'
import User from '@/database/user.question'
import { revalidatePath } from 'next/cache'
import Answer from '@/database/answer.model'
import Interaction from '@/database/interaction.model'

export async function getQuestions (params: GetQuestionsParams) {
  try {
    connectionToDatabase()

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions }
  } catch (error) {
    console.log(error)
  }
}

export async function createQuestion (params: CreateQuestionParams) {
  try {
    connectionToDatabase()

    // eslint-disable-next-line no-unused-vars
    const { title, content, tags, author, path } = params

    const question = await Question.create({
      title,
      content,
      tags: [], // Initialize tags as an empty array
      author
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

    // increament the auhtor reputation by some point

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
