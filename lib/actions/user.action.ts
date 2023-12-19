'use server'

import { connectionToDatabase } from '../mongoose'

import User from '@/database/user.question'
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams
} from './shared.types'
import { revalidatePath } from 'next/cache'
import console from 'console'
import Question from '@/database/question.model'
import path from 'path'

// this a demo comment
// this a seccond comment

export async function getUserById (params: any) {
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
export async function deleteUser (params: DeleteUserParams) {
  try {
    connectionToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    /**
     *
     * when delete a user
     * we need to delete questions , answer , comments
     *
     */

    const userQuestionsIds = await Question.find({ author: user._id }).distinct(
      '_id'
    )

    await Question.deleteMany({ author: user._id })

    /**
     * @todo later delete User answers , comments and other things if left any
     */

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (error) {
    console.log(error)
  }
}
