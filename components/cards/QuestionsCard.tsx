import Link from 'next/link'
import RenderTag from '../shared/RenderTag'
import Metric from '../shared/Metric'
import { formatNumber, getTimestamp, titleSlicer } from '@/lib/utils'
import { SignedIn } from '@clerk/nextjs'
import EditDeleteActions from '../shared/EditDeleteActions'
import { Badge } from '../ui/badge'
import Image from 'next/image'

interface QuestionProps {
  _id?: string | number
  title: string
  tags: {
    _id: string
    name: string
  }[]
  author: {
    _id: string | number
    name: string
    clerkId: string
    picture: string
  }
  type: string
  upvotes: string
  views: number
  answers: Array<object>
  answered: Boolean
  createdAt: Date
  clerkId?: string
}

const QuestionsCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  type,
  clerkId,
  answered,
  createdAt
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId
  console.log(answered)
  return (
    <div
      className={
        `card-wrapper ${answered ? 'border-green-400 dark:border-2' : 'dark:border-gray-800'} mt-8 rounded-[10px] border-2 p-9  sm:px-11`
      }
    >
      <div className='flex flex-col-reverse justify-between gap-5 sm:flex-row'>
        {/* <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
          {`- asked ${getTimestamp(createdAt)} ago `}
        </span> */}
        <Link href={`/${type}/${_id}`}>
          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1  flex-1 capitalize'>

          {titleSlicer(title, 10)}{title.length > 10 ? '...' : '' }
          </h3>
          {/* <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 flex-wrap max-lg:hidden'>
            {title}
          </h3> */}
        </Link>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteActions
              type='Questions'
              itemId={JSON.stringify(_id)}
              path={type}
            />
          )}
        </SignedIn>
        <Badge
          className={`${
            type === 'question' ? 'border border-violet-400' : 'border border-emerald-200'
          } subtle-medium background-light800_dark300 text-light400_light500  rounded-md px-4 py-2 uppercase
          max-sm:hidden
          `}

        >
          {type}
        </Badge>
      </div>
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          imgUrl={author.picture}
          value={author.name}
          alt={'user'}
          title={type === 'question' ? `- asked ${getTimestamp(createdAt)} ago` : `posted ${getTimestamp(createdAt)} ago` }
          href={`/profile/${author.clerkId}`}
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/like.svg'
          value={formatNumber(upvotes.length)}
          alt={'Upvotes'}
          title='Votes'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/message.svg'
          value={formatNumber(answers.length)}
          alt={'message'}
          title={type === 'question' ? 'answers' : 'comments'}
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/eye.svg'
          value={formatNumber(views)}
          alt={'eye'}
          title='views'
          textStyles='small-medium text-dark400_light800'
        />

      </div>
      <div className=' mt-3.5 flex flex-wrap gap-2 max-sm:relative'>
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
        {answered
          ? (
            <Image
    src={'/assets/icons/done-all.svg'}

    width={16}
    height={16}
    alt='checkmark'
    />
            )
          : ('')
        }

<Badge
          className={`${
            type === 'question' ? 'border border-violet-400' : 'border border-emerald-200'
          } subtle-medium background-light800_dark300 text-light400_light500  absolute right-0 hidden rounded-md px-4 py-2 uppercase max-sm:flex`}

        >
          {type}
        </Badge>
      </div>
    </div>
  )
}
export default QuestionsCard
