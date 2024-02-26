import { Schema, models, model, Document } from 'mongoose'
/**
 * improvement for the next update
 * answer is granted ability
 *
 */

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId
  question: Schema.Types.ObjectId
  accepted: boolean
  content: string
  upvotes: Schema.Types.ObjectId[]
  downvotes: Schema.Types.ObjectId[]
  createdAt: Date
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  accepted: { type: Boolean, default: false },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

const Answer = models.Answer || model('Answer', AnswerSchema)
export default Answer
