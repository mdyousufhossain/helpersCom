import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectionToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return console.log('missing url')

  if (isConnected) {
    console.log('MongoDB is already conneted')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'tododatabase'
    })

    isConnected = true

    console.log('mongoo db is connected')
  } catch (error) {
    console.error(error)
  }
}
