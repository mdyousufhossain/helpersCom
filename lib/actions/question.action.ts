'use server'

import { connectionToDat abase } from '../mongoose'

export async function createQuestion (params :any) {
  try {
    connectionToDatabase()
  } catch (error) {
    console.log(error)
  }
}
