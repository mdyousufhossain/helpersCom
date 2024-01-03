'use server'

import Answer from '@/database/answer.model'
import { connectionToDatabase } from '../mongoose'
import { CreateAnswerParams, GetAnswersParams } from './shared.types'
import Question from '@/database/question.model'
import { revalidatePath } from 'next/cache'

export async function createAnswer (params: CreateAnswerParams) {
  connectionToDatabase()

  try {
    const { content, author, question, path } = params

    const newAnswer = new Answer({
      content,
      author,
      question
    })

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    })

    /**
     * @todo
     * @add interaction
     * @user repution
     */

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAnswers (params:GetAnswersParams) {
  try {
    connectionToDatabase()

    const { questionId } = params

    const answer = await Answer.find({ question: questionId }).populate('author', '_id clerkId name picture')
      .sort({ createdAt: -1 })

    return { answer }
  } catch (error) {
    console.log(error)
  }
}
