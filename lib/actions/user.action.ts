'use server'

import { connectionToDatabase } from '../mongoose'
import { FilterQuery } from 'mongoose'
import User from '@/database/user.question'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import Question from '@/database/question.model'
import Tag from '@/database/tags.question'
import Answer from '@/database/answer.model'
import Blog from '@/database/blog.model'
import { BadgeCriteriaType } from '@/types'
import { assignBadge } from '../utils'

export async function getUserById (params: any) {
  try {
    connectionToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })
    return user
  } catch (error) {
    console.log(error)
  }
}

// this a demo comment
// this a seccond comment

export async function createUser (userData: CreateUserParams) {
  try {
    connectionToDatabase()

    const newUser = await User.create(userData)
    return newUser
  } catch (error) {
    console.log(error)
  }
}
export async function updateUser (params: UpdateUserParams) {
  try {
    connectionToDatabase()

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true
    })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}
export async function deleteUser (params: DeleteUserParams) {
  try {
    await connectionToDatabase()

    const { clerkId } = params

    const user: any = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // eslint-disable-next-line no-unused-vars
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   '_id'
    // )

    await Question.deleteMany({ author: user._id })
    await Blog.deleteMany({ author: user._id })
    // @todo: Later delete user answers, comments, and other related data if needed

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete user')
  }
}

export async function getAllUsers (params: GetAllUsersParams) {
  try {
    connectionToDatabase()

    const { searchQuery, filter } = params

    const query: FilterQuery<typeof User> = {}

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { username: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    }

    let sortOptions = {}

    switch (filter) {
      case 'new_users':
        sortOptions = { joinedAt: -1 }
        break
      case 'old_users':
        sortOptions = { joinedAt: 1 }
        break
      case 'top_contributors':
        sortOptions = { reputation: -1 }
        break
      default:
        break
    }
    const users = await User.find(query).sort(sortOptions)

    return { users }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function toggleSaveQuestion (params: ToggleSaveQuestionParams) {
  try {
    connectionToDatabase()

    const { userId, questionId, path } = params

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }
    const isQuestionsSaved = user.saved.includes(questionId)

    if (isQuestionsSaved) {
      // remove the questionid from the saved instance
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      )
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      )
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getSavedQuestions (params: GetSavedQuestionsParams) {
  try {
    connectionToDatabase()
    // page = 1, pageSize = 10, filter, gonna use later
    const { clerkId, searchQuery, filter } = params
    /**
     * query for searching fitler who saved the items or not
     *
     */
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {}

    let sortOptions = {}

    switch (filter) {
      case 'most_recent':
        sortOptions = { createdAt: -1 }
        break
      case 'oldest':
        sortOptions = { createdAt: 1 }
        break
      case 'most_voted':
        sortOptions = { upvotes: -1 }
        break
      case 'most_viewed':
        sortOptions = { views: -1 }
        break
      case 'most_answered':
        sortOptions = { answers: -1 }
        break
      default:
        break
    }

    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: sortOptions
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    })

    if (!user) {
      throw new Error('user not found')
    }

    const savedQuestions = user.saved
    return { question: savedQuestions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserinfo (params: GetUserByIdParams) {
  try {
    connectionToDatabase()
    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    if (!user) throw new Error('user not found')

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswer = await Answer.countDocuments({ author: user._id })
    const totalPost = await Blog.countDocuments({ author: user._id })

    /**
     * summing up the upvote , views and other intreaction of
     * question
     * blog
     * answer
     * so it means author of all the blog , question and answers
     * upvote , views is summing up for the badging system
     */

    // getting upvote of question
    const [questionUpvote] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0, upvotes: { $size: '$upvotes' }
        }
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: '$upvotes' }
        }
      }
    ])

    // getting upvote of blogs
    const [blogUpvote] = await Blog.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0, upvotes: { $size: '$upvotes' }
        }
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: '$upvotes' }
        }
      }
    ])

    // upvote of answers
    const [answerUpvote] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0, upvotes: { $size: '$upvotes' }
        }
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: '$upvotes' }
        }
      }
    ])

    // getting question views
    const [questionViews] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' }
        }
      }
    ])
    // getting blogs views
    const [blogViews] = await Blog.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' }
        }
      }
    ])

    const criteria = [
      { type: 'QUESTION_COUNT' as BadgeCriteriaType, count: totalQuestions },
      { type: 'ANSWER_COUNT' as BadgeCriteriaType, count: totalAnswer },
      { type: 'BlOG_COUNT' as BadgeCriteriaType, count: totalPost },
      { type: 'QUESTION_UPVOTES' as BadgeCriteriaType, count: questionUpvote?.totalUpvotes || 0 },
      { type: 'BLOG_UPVOTE' as BadgeCriteriaType, count: blogUpvote?.totalUpvotes || 0 },
      { type: 'QUESTION_VIEWS' as BadgeCriteriaType, count: questionViews?.totalViews || 0 },
      { type: 'BLOG_VIEWS' as BadgeCriteriaType, count: blogViews?.totalViews || 0 },
      { type: 'ANSWER_UPVOTE' as BadgeCriteriaType, count: answerUpvote?.totalUpvotes || 0 }
    ]

    const badgeCounts = assignBadge({ criteria })
    console.log(badgeCounts)
    return { user, totalAnswer, totalQuestions, totalPost, badgeCounts, reputation: user.reputation }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserQuestions (params: GetUserStatsParams) {
  try {
    connectionToDatabase()

    const { userId } = params // , page = 1, pageSize = 10

    const totalQuestions = await Question.countDocuments({ author: userId })

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvote: -1 })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')

    return { totalQuestions, questions: userQuestions }
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function getUserAnswers (params: GetUserStatsParams) {
  try {
    connectionToDatabase()

    const { userId } = params // , page = 1, pageSize = 10

    const totalAnswer = await Answer.countDocuments({ author: userId })

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvote: -1 })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture')

    return { totalAnswer, answers: userAnswers }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserPosts (params: GetUserStatsParams) {
  try {
    connectionToDatabase()

    const { userId } = params // , page = 1, pageSize = 10

    const totalQuestions = await Blog.countDocuments({ author: userId })

    const userQuestions = await Blog.find({ author: userId })
      .sort({ views: -1, upvote: -1 })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')

    return { totalQuestions, questions: userQuestions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// export async function updateUser (params:UpdateUserParams) {
//   try {
//     connectionToDatabase()

//     const { clerkId, updateData, path } = params

//     await User.findByIdAndUpdate({ clerkId }, updateData, {
//       new: true
//     })
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

// export async function getAllUsers(params:GetAllUsersParams) {

//   try {
//     connectionToDatabase()
//   } catch (error) {
//       console.log(error)
//       throw error
//   }

// }
