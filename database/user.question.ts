import { Schema, models, model, Document } from 'mongoose'

export interface IUser extends Document {
  clerkid: string
  name: string
  username: string
  email: string
  password?: string
  bio?: string
  picture: string
  location?: string
  portfolioWebsite: string
  reputation?: number
  saved: Schema.Types.ObjectId[]
  savePost:Schema.Types.ObjectId[]
  joinedAt: Date
}

// user schema reuqired
const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  savePost: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  joinedAt: { type: Date, default: Date.now }
})

const User = models.User || model('User', UserSchema)

export default User
