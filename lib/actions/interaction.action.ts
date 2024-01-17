'use server'

import Question from '@/database/question.model'
import { connectionToDatabase } from '../mongoose'
import { ViewQuestionParams } from './shared.types'
import Interaction from '@/database/interaction.model'

export async function viewQuestion (params:ViewQuestionParams) {
  try {
    await connectionToDatabase()
    const { questionId, userId } = params

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } })

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'views',
        quesiton: questionId
      })
      if (existingInteraction) return console.log('User has already viewed')

      await Interaction.create({
        user: userId,
        action: 'views',
        question: questionId
      })
    }
  } catch (error) {
    console.log(error)
  }
}
