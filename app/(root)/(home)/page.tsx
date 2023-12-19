import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LocalSearch from '@/components/shared/search/LocalSearch'
import Filter from '@/components/shared/Filter'
import { HomePageFilters } from '@/constants/filters'
import HomeFilter from '@/components/home/HomeFilter'
import NoResult from '@/components/shared/NoResult'
import QuestionsCard from '@/components/cards/QuestionsCard'
import { formatNumber } from '@/lib/utils'
import { getQuestions } from '@/lib/actions/question.action'
// bal
export default async function Home () {
  const result : any = await getQuestions({})

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions </h1>
        <Link href={'/ask-question'} className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherclasses='flex-1'
        />
        <Filter
          filters={HomePageFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
          containerclasses='hidden max-md:flex'
        />
      </div>
      <HomeFilter />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* looping through question */}
        {result.questions.length > 0
          ? (
              result.questions.map(({ question } : any) => (
            <QuestionsCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={formatNumber(question.upvotes)}
              views={formatNumber(question.views)}
              answers={question.answers}
              createdAt={question.createdAt}
            />
              ))
            )
          : (
          <NoResult
            title=' No result founded or something unexpected occured 🚀'
            description='Be first to break the silence Ask a Questions and kickstart the
          discusstion. our query could be the next big thing others learn from.
          Get involved💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
            )}
      </div>
    </>
  )
}
