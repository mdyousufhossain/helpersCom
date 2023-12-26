'use sever'

import User from '@/database/user.question'
import { GetTopInteractedTagsParams } from './shared.types'
import { connectionToDatabase } from '../mongoose'

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
