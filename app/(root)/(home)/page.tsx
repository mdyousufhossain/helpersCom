import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LocalSearch from '@/components/shared/search/LocalSearch'
import Filter from '@/components/shared/Filter'
import { HomePageFilters } from '@/constants/filters'
import HomeFilter from '@/components/home/HomeFilter'

export default function Home() {
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
    </>
  )
}
