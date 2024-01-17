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
    <h1 className='h1-bold text-dark100_light900'></h1>

  <div className='mt-11 w-full'>
    <LocalSearch
      route='/'
      iconPosition='left'
      imgSrc='/assets/icons/search.svg'
      placeholder='Search for questions'
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
          title={question.tagTitle}
          tags={question.tags}
          author={question.author}
          upvotes={formatNumber(question.upvotes.length)}
          views={formatNumber(question.views)}
          answers={question.answers}
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
