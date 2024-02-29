import LocalSearch from '@/components/shared/search/LocalSearch'
import Filter from '@/components/shared/Filter'
import { QuestionFilters } from '@/constants/filters'
import NoResult from '@/components/shared/NoResult'
import QuestionsCard from '@/components/cards/QuestionsCard'
import { getSavedQuestions } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import { SearchParamsProps } from '@/types'
// bal
export default async function Home ({ searchParams }: SearchParamsProps) {
  const { userId } = auth()
  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter
  })

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Saved Question</h1>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherclasses='flex-1'
        />
        <Filter
          filters={QuestionFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* looping through question */}
        {result.question.length > 0
          ? (
              result.question.map((question: any) => (
            <QuestionsCard
                  key={question._id}
                  _id={question._id}
                  title={question.title}
                  tags={question.tags}
                  author={question.author}
                  upvotes={question.upvotes}
                  views={question.views}
                  answers={question.answers}
                  createdAt={question.createdAt}
                  type={question.type} answered={question.answered && question.answered.length > 0}/>
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
