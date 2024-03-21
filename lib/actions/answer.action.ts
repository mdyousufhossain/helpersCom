'use server'

import Answer from '@/database/answer.model'
import { connectionToDatabase } from '../mongoose'
import {
  AcceptedSolutions,
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
  answerProps
} from './shared.types'
import Question from '@/database/question.model'
import { revalidatePath } from 'next/cache'
import Interaction from '@/database/interaction.model'
import User from '@/database/user.question'

export async function createAnswer (params: CreateAnswerParams) {
  connectionToDatabase()

  try {
    const { content, author, question, path } = params

    const newAnswer = await Answer.create({
      content,
      author,
      question
    })

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    })

    /**
     *
     * @todo
     * @add interaction
     * @user repution
     *
     */

    await Interaction.create({
      user: author,
      action: 'answer',
      question,
      answer: newAnswer._id,
      tags: questionObject.tags
    })

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAnswers (params: GetAnswersParams) {
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

    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort(sortOptions)

    return { answers }
  } catch (error) {
    console.log(error)
  }
}

export async function upvoteAnswer (params: AnswerVoteParams) {
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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }

    // increament the auhtor reputation by some point
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasupVoted ? -2 : 2 } })

    await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasupVoted ? -10 : 10 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteAnswer (params: AnswerVoteParams) {
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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    })

    if (!answer) {
      throw new Error('answer not found')
    }

    // increament the auhtor reputation by some point
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasdownVoted ? -2 : 2 } })


    await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasdownVoted ? -10 : 10 } })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteAnswer (params: DeleteAnswerParams) {
  try {
    connectionToDatabase()

    const { answerId, path } = params

    const answer = await Answer.findById(answerId)

    if (!answer) throw new Error('answer not found')

    await Answer.deleteOne({ _id: answerId })

    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    )

    await Interaction.deleteMany({ answer: answerId })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function markAnswerAccepted (params : AcceptedSolutions) {
  try {
    const { questionid, answerid, path } = params

    const answer = await Answer.findById(answerid)
    const question = await Question.findById(questionid)
    if (!answerid) {
      throw new Error('Answer not found')
    }

    if (!question.answers.includes(answer._id)) {
      throw new Error('The provided answer does not belong to this question')
    }

    if (question.answered.length > 0) {
      throw new Error('This question already has an accepted answer')
    }

    console.log('this is answer accepted :', answer.author)
    // Mark the answer as accepted
    answer.accepted = true
    await answer.save()

    // Update the question to reflect the accepted answer
    question.answered = [answer._id]
    await question.save()

    await User.findByIdAndUpdate(answer.author, { $inc: { reputation: 15 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
};

export async function isAnswerAccepted (params : answerProps) {
  try {
    // Find the answer by its ID
    const { answerId } = params
    const answer = await Answer.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    // Check if the answer is accepted
    return answer.accepted
  } catch (error) {
    console.log(error)
  }
}
