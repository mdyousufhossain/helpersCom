import { Schema, models, model, Document } from 'mongoose'

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId
  question: Schema.Types.ObjectId
  content: string
  upvotes: Schema.Types.ObjectId[]
  downvotes: Schema.Types.ObjectId[]
  createdAt: Date
}

const CommentsSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

const Comments = models.Comments || model('Comments', CommentsSchema)
export default Comments
