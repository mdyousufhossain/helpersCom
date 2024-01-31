import { Schema, models, model, Document } from 'mongoose'

export interface IComment extends Document {
  text: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

const Comment = models.Comment || model<IComment>('Comment', commentSchema)

export default Comment
