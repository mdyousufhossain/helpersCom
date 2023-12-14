'use server'

import { connectionToDatabase } from '../mongoose'

import User from '@/database/user.question'

export async function getUserById(params: any) {
  try {
    connectionToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}
