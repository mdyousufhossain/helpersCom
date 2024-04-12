import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'

import { TagFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.actions'
import { SearchParamsProps } from '@/types'
// import { getAllUsers } from '@/lib/actions/user.action'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata : Metadata = {
  title: 'Tags | HelpersCom',
  description: 'HelpersCom is community where developer living in harmony'

}
const Page = async ({ searchParams }:SearchParamsProps) => {
  const reuslt = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter
  })

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
          filters={TagFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
          containerclasses='flex'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        {/* reuslt */}
        {reuslt.tags.length > 0
          ? (
              reuslt.tags.map((tag) => (
                <Link href={`/tags/${tag._id}`} key={tag._id}>
                    <article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
                        <div className='background-light800_dark400 w-fit rounded-sm px-5 py-1.5'>
                            <p className='paragraph-semibold text-dark300_light900'> { tag.name}</p>
                        </div>

                        <p className='small-medium text-dark400_light500 mt-3.5'>
                            <span className='body-semibold primary-text-gradient mr-2.5'> {tag.questions.length} +</span>
                        </p>
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
