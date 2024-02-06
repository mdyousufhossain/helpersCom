'use server'

import User from '@/database/user.question'
import {
  GetAllTagsParams,
  GetQuestionByIdParams,
  GetTopInteractedTagsParams
} from './shared.types'
import { connectionToDatabase } from '../mongoose'
import Tag, { ITag } from '@/database/tags.question'

import { FilterQuery } from 'mongoose'
import Question from '@/database/question.model'
import Blog from '@/database/blog.model'

export async function getTopInterectedTags (params: GetTopInteractedTagsParams) {
  try {
    connectionToDatabase()

    // eslint-disable-next-line no-unused-vars
    const { userId, limit = 3 } = params

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    // find interactions for the user and group by tags

    return [
      { _id: '1', name: 'demo tag' },
      { _id: '2', name: 'demo tag 2' },
      { _id: '3', name: 'demo tag 3' }
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllTags (params: GetAllTagsParams) {
  try {
    connectionToDatabase()

    const tags = await Tag.find({})

    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId (params: GetQuestionByIdParams) {
  try {
    connectionToDatabase()

    const { tagId, searchQuery } = params // page = 1, pageSize = 10

    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 }
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    }).populate({
      path: 'blogs',
      model: Blog,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 }
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    const questionsTags = tag.questions
    const blogsTags = tag.blogs
    const questions = [...questionsTags, ...blogsTags]

    return { tagtitle: tag.name, questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}
