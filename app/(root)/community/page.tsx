import UserCard from '@/components/cards/UserCard'
import LocalSearch from '@/components/shared/search/LocalSearch'
import { getAllUsers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'

const Page = async ({ searchParams }: SearchParamsProps) => {
  const reuslt = await getAllUsers({
    searchQuery: searchParams.q
  })

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users </h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for goofy dude'
          otherclasses='flex-1'
        />
        {/* <Filter
          filters={UserFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
          containerclasses='flex'
        /> */}
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        {/* reuslt */}
        {reuslt.users.length > 0
          ? (
              reuslt.users.map((user) => <UserCard key={user._id} user={user} />)
            )
          : (
          <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
            <p> No user found sign up now !</p>
            <Link href='/sign-up' className='mt-2 font-bold text-accent-blue'>
              Be the first man on the platform
            </Link>
          </div>
            )}
      </section>
    </>
  )
}
export default Page
