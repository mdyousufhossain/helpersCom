interface QuestionProps {
  _id?: string | number
  title: string
  tags: {
    _id: string
    name: string
  }[]
  author: {
    _id?: string | number
    name: string
    picture: string
  }
  upvotes: number
  views: number
  answers: Array<object>
  createdAt?: Date | string
}

const QuestionsCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}: QuestionProps) => {
  return <div>QuestionsCard</div>
}
export default QuestionsCard
