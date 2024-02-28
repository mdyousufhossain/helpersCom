import {
  getQuestionsById,
  isQuestionAuthor
} from '@/lib/actions/question.action'
import Link from 'next/link'
import Image from 'next/image'
import Metric from '@/components/shared/Metric'
import { formatNumber, getTimestamp } from '@/lib/utils'
import ParseHTML from '@/components/shared/ParseHTML'
import RenderTag from '@/components/shared/RenderTag'
import Answer from '@/components/forms/Answer'
import { SignedIn, auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.action'
import AllAnswer from '@/components/shared/AllAnswer'
import Voting from '@/components/shared/Voting'
import EditDeleteActions from '@/components/shared/EditDeleteActions'

const Page = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth()

  let mongoUser: any

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }
  const isAuthor = await isQuestionAuthor({
    questionid: params.id,
    userid: clerkId
  })

  const result = await getQuestionsById({ questionId: params.id })

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
          <div className='flex items-start justify-around'>
            <Voting
              type='Question'
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)} questionId={''} answersId={''}/>
          </div>
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
         <div>
          <SignedIn>
          {isAuthor && (
            <EditDeleteActions
              type='Questions'
              itemId={JSON.stringify(params.id)}
              path={'Question'}
            />
          )}
        </SignedIn>
          </div>
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

      <AllAnswer
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
        qauthor={mongoUser.clerkId}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
        content='Write Your Answer'
      />
    </>
  )
}

export default Page
