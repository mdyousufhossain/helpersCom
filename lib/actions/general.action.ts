'use server'

import { connectionToDatabase } from '../mongoose'
import { SearchParams } from './shared.types'
import Question from '@/database/question.model'
import Blog from '@/database/blog.model'
import User from '@/database/user.question'
import Answer from '@/database/answer.model'
import Tag from '@/database/tags.question'

const SearchableTypes = ['question', 'blog', 'user', 'answer', 'tag']

export async function globalSearch (params: SearchParams) {
  try {
    await connectionToDatabase()

    const { query, type } = params
    const regexQuery = { $regex: query, $options: 'i' }

    let results: { title: any; type: string | null | undefined; id: any }[] = []

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: Blog, searchField: 'title', type: 'blog' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' }
    ]

    const typeLower = type?.toLocaleLowerCase()

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // search accross everything
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: regexQuery
          }).limit(2)

        results.push(
          ...queryResults.map((item) => ({
            title: type === 'answer'
              ? `Answers containing ${query}`
              : item[searchField],
            type,
            id: type === 'user'
              ? item.clerkid
              : type === 'answer' ? item.question : item._id
          }))
        )
      }
    } else {
      // selected model
      const modelInfo = modelsAndTypes.find((item) => item.type === type)

      if (!modelInfo) {
        throw new Error('Invalid search tag')
      }

      const queryResults = await modelInfo.model.find({
        [
        modelInfo.searchField]: regexQuery
      }
      ).limit(8)

      results = queryResults.map((item) => ({
        title: type === 'answer'
          ? `Answers containing ${query}`
          : item[modelInfo.searchField],
        type,
        id: type === 'user'
          ? item.clerkid
          : type === 'answer' ? item.question : item._id
      }))
    }

    return JSON.stringify(results)
  } catch (error) {
    console.log(error)
  }
}
