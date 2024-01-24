import mongoose from 'mongoose'

export const connectionToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return console.log('missing url')
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'tododatabase'
    })
  } catch (error) {
    console.error(error)
  }
}
