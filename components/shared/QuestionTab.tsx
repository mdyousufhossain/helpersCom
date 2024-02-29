import { getUserQuestions } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import QuestionsCard from '../cards/QuestionsCard'

interface Props extends SearchParamsProps {
    userId : string
    clerkId?:string
}

const QuestionTab = async ({ userId, clerkId } : Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1
  })
  return (
    <div>{result.questions.map((item) => (
        <QuestionsCard
        key={item._id}
        _id={item._id}
        clerkId={clerkId}
        title={item.title}
        tags={item.tags}
        author={item.author}
        upvotes={item.upvotes}
        views={item.views}
        answers={item.answers}
        createdAt={item.createdAt}
        type={'question'} answered={item.answered && item.answered.length > 0}/>
    ))}</div>
  )
}
export default QuestionTab
