'use server'

import Question from '@/database/question.model'
import { connectionToDatabase } from '../mongoose'
import Tag from '@/database/tags.question'

export async function createQuestion(params: any) {
  try {
    connectionToDatabase()

    const { title, content, tags, author, path } = params

    const question = await Question.create({
      title,
      content,
      tags,
      author
    })
    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      )
      tagDocuments.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    })
  } catch (error) {
    console.log(error)
  }
}
