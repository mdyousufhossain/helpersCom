'use server'

import Question from '@/database/question.model'
import { connectionToDatabase } from '../mongoose'
import { ViewBlogParams, ViewQuestionParams } from './shared.types'
import Interaction from '@/database/interaction.model'
import Blog from '@/database/blog.model'

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

export async function ViewBlog (params:ViewBlogParams) {
  try {
    await connectionToDatabase()
    const { postId, userId } = params

    await Blog.findByIdAndUpdate(postId, { $inc: { views: 1 } })

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'views',
        quesiton: postId
      })
      if (existingInteraction) return console.log('User has already viewed')

      await Interaction.create({
        user: userId,
        action: 'views',
        question: postId
      })
    }
  } catch (error) {
    console.log(error)
  }
}
