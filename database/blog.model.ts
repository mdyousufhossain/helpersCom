import { Schema, models, model, Document } from 'mongoose'

export interface Iblog extends Document {
  title: string
  content: string
  tags: Schema.Types.ObjectId[]
  views: number
  upvotes: Schema.Types.ObjectId[]
  author: Schema.Types.ObjectId[]
  comments: Schema.Types.ObjectId[]
  createdAt: Date
}

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Answers' }],
  createdAt: { type: Date, default: Date.now }
})

const blog = models.blog || model('blog', blogSchema)

export default blog
