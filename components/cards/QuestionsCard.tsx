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
// making questions cards 

/**
 * 
 * @param param0 views:fun count the click or views coount so it dosnt neccerlery get from the users
 * @returns 
 */
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
