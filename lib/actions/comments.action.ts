import { revalidatePath } from 'next/cache'

import { connectionToDatabase } from '../mongoose'
import { AnswerVoteParams, CreateCommentParams, DeleteAnswerParams, GetAnswersParams } from './shared.types'
import Comments from '@/database/comment.model'
import Blog from '@/database/blog.model'
import Interaction from '@/database/interaction.model'

export async function createComments (params: CreateCommentParams) {
  connectionToDatabase()

  try {
    const { content, author, postid, path } = params

    const newAnswer = await Comments.create({
      content,
      author,
      postid
    })
    // Use await to ensure Blog is defined before update
    await Blog.findByIdAndUpdate(postid, {
      $push: { answers: newAnswer._id }
    })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getComments (params: GetAnswersParams) {
  try {
    connectionToDatabase()

    const { questionId, sortBy } = params

    let sortOptions = {}

    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 }
        break
      case 'lowestUpvotes':
        sortOptions = { downvotes: -1 }
        break
      case 'recent':
        sortOptions = { createdAt: -1 }
        break
      case 'old':
        sortOptions = { createdAt: 1 }
        break
      default:
        break
    }

    const answers = await Comments.find({ post: questionId })
      .populate('author', '_id clerkId name picture')
      .sort(sortOptions)

    return { answers }
  } catch (error) {
    console.log(error)
  }
}

export async function upvoteComments (params: AnswerVoteParams) {
  try {
    connectionToDatabase()

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params

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

    const answer = await Comments.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }

    // increament the auhtor reputation by some point

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteComments (params: AnswerVoteParams) {
  try {
    connectionToDatabase()

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downvote: userId } }
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Comments.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }

    // increament the auhtor reputation by some point

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteComments (params: DeleteAnswerParams) {
  try {
    connectionToDatabase()

    const { answerId, path } = params

    const answer = await Comments.findById(answerId)

    if (!answer) throw new Error('answer not found')

    await Comments.deleteOne({ _id: answerId })

    await Blog.updateMany(
      { _id: answer.post },
      { $pull: { answers: answerId } }
    )

    await Interaction.deleteMany({ comment: answerId })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
