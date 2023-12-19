'use server'
import mongoose from 'mongoose'
import Question from '@/database/question.model'
import { connectionToDatabase } from '../mongoose'
import Tag from '@/database/tags.question'
import { CreateQuestionParams, GetQuestionsParams } from './shared.types'
import User from '@/database/user.question'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectionToDatabase()

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })

    return { questions }
  } catch (error) {
    console.log(error)
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectionToDatabase()

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
        $push: { tags: { $each: tagsAsObjectId } },
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
  }
}
