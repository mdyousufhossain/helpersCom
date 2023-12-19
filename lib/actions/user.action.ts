'use server'

import { connectionToDatabase } from '../mongoose'

import User from '@/database/user.question'
import { CreateUserParams, UpdateUserParams } from './shared.types'
import { revalidatePath } from 'next/cache'

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

export async function createUser(userData: CreateUserParams) {
  try {
    connectionToDatabase()

    const newUser = await User.create(userData)
    return newUser
  } catch (error) {
    console.log(error)
  }
}
export async function updateUser (params: UpdateUserParams) {
  try {
    connectionToDatabase()

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true
    })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}
