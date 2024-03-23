import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LocalSearch from '@/components/shared/search/LocalSearch'
import Filter from '@/components/shared/Filter'
import { HomePageFilters } from '@/constants/filters'
import HomeFilter from '@/components/home/HomeFilter'
import NoResult from '@/components/shared/NoResult'
import QuestionsCard from '@/components/cards/QuestionsCard'
import { getQuestions } from '@/lib/actions/question.action'
import { SearchParamsProps } from '@/types'
import Pagination from '@/components/shared/Pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default async function Home ({ searchParams }: SearchParamsProps) {
  const result: any = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1
  })

  return (
    <>
      <div className='flex w-full justify-between gap-4 sm:flex-row sm:items-center'>
      <div className='flex w-full justify-between'>
        <h1 className='h1-bold text-dark100_light900'>Feeds</h1>
        <div>
        <Popover>
          <PopoverTrigger className='primary-gradient min-h-[46px] rounded px-4 py-3 !text-light-900'>
                Write a Post
          </PopoverTrigger>
          <PopoverContent className='flex justify-around gap-2'>
            {/* <div className='flex flex-col items-center gap-2'> */}
            <Link
              href={'/ask-question'}
              className='primary-gradient flex min-h-[46px] justify-end rounded px-4 py-3 !text-light-900 max-sm:w-full'
            >
                Ask a Question
            </Link>
            <Link
              href={'/post'}
              className='flex min-h-[46px] justify-end bg-green-400 px-4 py-3 !text-light-900 max-sm:w-full'
            >
                Write  a Blog
            </Link>
          </PopoverContent>
        </Popover>
        </div>
        </div>
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
      <HomeFilter filters={HomePageFilters} />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* looping through question */}
        {result.items.length > 0
          ? (
              result.items.map((question: any) => (
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
              type={question.type}
              answered={question.answered && question.answered.length > 0}
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
      <div className='mt-10'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  )
}
