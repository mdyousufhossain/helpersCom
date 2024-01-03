import { AnswerFilters } from '@/constants/filters'
import Filter from './Filter'
import { getAnswers } from '@/lib/actions/answer.action'

interface Props {
  questionId: string
  userId: string
  totalAnswers: string
  page: string
  filter: string
}

const AllAnswer = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter
}: Props) => {
  const result = await getAnswers({
    questionId
  })
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-between'>
        <h3 className='primary-text-gradient'> {totalAnswers} Answers</h3>

        {/* filters */}

        <Filter filters={AnswerFilters} />

        <div>
            {result?.answers.map((answer) => (
                <article key={answer._id} className='light-border justify-between border-b py-10'>
                {/** spand id  */}
                </article>
            ))}
        </div>
      </div>
    </div>
  )
}
export default AllAnswer
