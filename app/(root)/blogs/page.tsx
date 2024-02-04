import QuestionsCard from '@/components/cards/QuestionsCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'
import { Button } from '@/components/ui/button'
import { BlogPostFilters } from '@/constants/filters'
import { getPosts } from '@/lib/actions/blog.action'
import Link from 'next/link'

const page = async () => {
  const bal = await getPosts({})

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions </h1>
        <Link href={'/blogs/post'} className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Post
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for Post'
          otherclasses='flex-1'
        />
        <Filter
          filters={BlogPostFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
          containerclasses='hidden max-md:flex'
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* looping through question */}
        
        {bal.posts.length > 0

          ? (
              bal?.posts.map((post: any) => (
            <QuestionsCard
            key={post._id}
            _id={post._id}
            title={post.title}
            tags={post.tags}
            author={post.author}
            upvotes={post.upvotes}
            views={post.views}
            answers={post.answers}
            createdAt={post.createdAt}
             />
              ))
            )
          : (
          <NoResult
            title=' No result founded or something unexpected occured 🚀'
            description='Be first to break the silence and make a post and kickstart the
          discusstion. our query could be the next big thing others learn from.
          Get involved💡'
            link='/blogs/post'
            linkTitle='Ask a Question'
          />
            )}
      </div>

    </>
  )
}
export default page
