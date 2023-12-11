import { Tags } from 'lucide-react'
import { Schema, models, model, Document } from 'mongoose'
import { title } from 'process'

export interface IQuestion extends Document {
  title: string
  content: string
  tags: Schema.Types.ObjectId[]
  views: number
  upvote: Schema.Types.ObjectId[]
  author: Schema.Types.ObjectId[]
  answer: Schema.Types.ObjectId[]
  createdAt: Date
}

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Anwers' }],
  createdAt: { type: Date, default: Date.now },
})

const Question = models.Question || model('Question', QuestionSchema)


export default Question