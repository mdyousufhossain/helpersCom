import { Schema, models, model, Document } from 'mongoose'

export interface ITag extends Document {
  name: string
  description: string
  questions: Schema.Types.ObjectId[]
  followers: Schema.Types.ObjectId[]
  createdOn: Date
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Replace 'Question' with the actual model name for questions
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Replace 'User' with the actual model name for users
  createdOn: { type: Date, default: Date.now }
})

const Tag = models.Tag || model('Tag', TagSchema)
