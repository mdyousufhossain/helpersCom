import Link from 'next/link'
import RenderTag from '../shared/RenderTag'
import Metric from '../shared/Metric'
import { formatNumber, getTimestamp } from '@/lib/utils'
import { SignedIn } from '@clerk/nextjs'
import EditDeleteActions from '../shared/EditDeleteActions'

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
    clerkId :string
    picture: string
  }
  type:string
  upvotes: string
  views: number
  answers: Array<object>
  createdAt: Date
  clerkId?: string
}
// making questions cards

/**
 *
 * @param param views:fun count the click or views coount so it dosnt neccerlery get from the users
 * @todo fix the upvote and answer system
 * @returns
 */

/**
 * major @bug to in http://localhost:3000/tags/items/goes to only id click cause props takes from the type..  it was simple solution
 * @todo
 * we need to make new database and add type to ensure questions and blog post together
 * and other functionality
 *
 */
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
  createdAt
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId
  return (
    <div className='card-wrapper mt-8 rounded-[10px] border-2 p-9 dark:border-gray-800 sm:px-11'>
      <div className='flex flex-col-reverse items-center justify-between gap-5 sm:flex-row'>
        {/* <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
          {`- asked ${getTimestamp(createdAt)} ago `}
        </span> */}
        <Link href={`/${type}/${_id}`}>
          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
            {title}
          </h3>
        </Link>

        <SignedIn>
           {showActionButtons && (
            <EditDeleteActions type='Questions' itemId={JSON.stringify(_id)} path={type}/>
           )}
        </SignedIn>
      </div>
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          imgUrl={author.picture}
          value={author.name}
          alt={'user'}
          title={`- asked ${getTimestamp(createdAt)} ago `}
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
          title='answers'
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
      <div className=' mt-3.5 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
    </div>
  )
}
export default QuestionsCard
