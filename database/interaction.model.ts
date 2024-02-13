import { Schema, models, model, Document } from 'mongoose'
// import Answer from './answer.model'
// import Tag from './tags.question'

export interface IInteraction extends Document {
    user : Schema.Types.ObjectId
    action : string
    question: Schema.Types.ObjectId
    post: Schema.Types.ObjectId
    answer : Schema.Types.ObjectId
    comment : Schema.Types.ObjectId
    tags: Schema.Types.ObjectId
    createdAt:Date;
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  qestion: { type: Schema.Types.ObjectId, ref: 'Question' },
  post: { type: Schema.Types.ObjectId, ref: 'Blog' },
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comments' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now }
})

const Interaction = models.Interaction || model('Interaction', InteractionSchema)

export default Interaction
