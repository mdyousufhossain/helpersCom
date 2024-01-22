import QuestionsCard from '@/components/cards/QuestionsCard'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'
import { IQuestion } from '@/database/question.model'
import { getQuestionsByTagId } from '@/lib/actions/tag.actions'
import { formatNumber } from '@/lib/utils'
import { URLProps } from '@/types'

const Page = async ({ params, searchParams } : URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q
  })

  return (
    <>
    <h1 className='h1-bold text-dark100_light900'>{result.tagtitle}</h1>

  <div className='mt-11 w-full'>
    <LocalSearch
      route='/'
      iconPosition='left'
      imgSrc='/assets/icons/search.svg'
      placeholder='Search Tag questions'
      otherclasses='flex-1'
    />
  </div>

  <div className='mt-10 flex w-full flex-col gap-6'>
    {/* looping through question */}
    {result.questions.length > 0
      ? (
          result.questions.map((question : IQuestion) => (
        <QuestionsCard
          key={question._id}
          _id={question._id}
          title={question.title}
          // @ts-ignore
          // @todo fix the issue of type error
          tags={question.tags}
          // @ts-ignore
          author={question.author}
          // @ts-ignore
          upvotes={formatNumber(question.upvote)}
          views={formatNumber(question.views)}
          answers={question.answer}
          createdAt={question.createdAt}
        />
          ))
        )
      : (
      <NoResult
        title=' No result founded or something unexpected occured 🚀'
        description='Save Question from home page to see content'
        link='/'
        linkTitle='saved content'
      />
        )}
  </div>
</>
  )
}
export default Page
