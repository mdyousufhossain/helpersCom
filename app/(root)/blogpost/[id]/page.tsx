import Comment from '@/components/forms/Comment'
import AllComments from '@/components/shared/AllComments'
import Metric from '@/components/shared/Metric'
import ParseHTML from '@/components/shared/ParseHTML'
import RenderTag from '@/components/shared/RenderTag'
import Voting from '@/components/shared/Voting'
import { getPostById } from '@/lib/actions/blog.action'
import { getUserById } from '@/lib/actions/user.action'
import { formatNumber, getTimestamp } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Page = async ({ params }: any) => {
  const { userId: clerkId } = auth()

  let mongoUser : any

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }

  const result = await getPostById({ postId: params.id })

  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link
            href={`/profile/${result.author.clerkId}`}
            className='flex items-start  gap-1'
          >
            <Image
              src={result.author.picture}
              width={22}
              height={22}
              alt={`${result.author.name}s profile picture`}
              className='rounded-full'
            />
            <p className='paragraph-semibold text-dark300_light700'>
              {result.author.name}
            </p>
          </Link>
          <div className='flex items-start justify-end'>
          <Voting
              type='Post'
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={false} questionId={''} answersId={''} /></div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
          {' '}
          {result.title}
        </h2>
      </div>

      <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
          imgUrl='/assets/icons/clock.svg'
          value={`${getTimestamp(result.createdAt)}`}
          alt={'Clock Icons'}
          title='Asked'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/message.svg'
          value={formatNumber(result.answers.length)}
          alt={'message'}
          title='answers'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/eye.svg'
          value={formatNumber(result.views)}
          alt={'eye'}
          title='views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>

      <ParseHTML data={result.content} />

      <div className='mt-8 flex flex-wrap gap-2'>
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

       <AllComments

        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length} qauthor={''} />

       <Comment
          post={result.content}
          postId={JSON.stringify(result._id)}
         authorId={JSON.stringify(mongoUser._id)}
         content={'Write Your Comments'}

       />
    </>
  )
}

export default Page
