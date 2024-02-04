'use server'

import { connectionToDatabase } from '../mongoose'
import Tag from '@/database/tags.question'
import mongoose from 'mongoose'
import { CreateBlogParams, GetBlogParams } from './shared.types'
import Blog from '@/database/blog.model'
import User from '@/database/user.question'

export async function createBlogPost (params:CreateBlogParams) {
  try {
    connectionToDatabase()

    const { title, content, tags, author } = params // path

    const question = await Blog.create({
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

    await Blog.findByIdAndUpdate(
      question._id,
      {
        $push: { tags: { $each: tagsAsObjectId } }
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}

// getting all the post

export async function getPosts (params:GetBlogParams) {
  try {
    connectionToDatabase()

    const posts = await Blog.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { posts }
  } catch (error) {
    console.log(error)
  }
}
