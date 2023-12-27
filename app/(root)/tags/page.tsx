import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'

import { UserFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.actions'
// import { getAllUsers } from '@/lib/actions/user.action'
import Link from 'next/link'

const Page = async () => {
   const reuslt = await getAllTags({})
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Tags</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/tags'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for goofy dude'
          otherclasses='flex-1'
        />
        <Filter
          filters={UserFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
          containerclasses='flex'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        {/* reuslt */}
        {reuslt.tags.length > 0
          ? (
              reuslt.tags.map((tag) => (
                <Link href={`/tags/${tag._id}`} key={tag._id} 
                    <article className='background-light900_dark200 light-border'>

                    </article>
                </Link>
              ))
            )
          : (
          <NoResult title='No Tags Found' description='Its seems like there no tag found' link='/ask-question' linkTitle='Ask a question'/>)}
      </section>
    </>
  )
}
export default Page
