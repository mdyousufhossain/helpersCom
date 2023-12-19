'use server'

import { connectionToDatabase } from '../mongoose'

import User from '@/database/user.question'
import { CreateUserParams } from './shared.types'

// this a demo comment
// this a seccond comment

export async function getUserById(params: any) {
  try {
    connectionToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.log(error)
  }
}

// this a demo comment
// this a seccond comment

export async function createUser (userData: CreateUserParams) {
  try {
    connectionToDatabase()

    const newUser = await User.create(userData)
    return newUser
  } catch (error) {
    console.log(error)
  }
}
