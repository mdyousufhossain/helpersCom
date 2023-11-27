import Link from 'next/link'
import RenderTag from '../shared/RenderTag'

interface QuestionProps {
  _id?: string | number
  title: string
  tags: {
    _id: string
    name: string
  }[]
  author: {
    _id?: string | number
    name: string
    picture: string
  }
  upvotes: number
  views: number
  answers: Array<object>
  createdAt?: Date | string
}
// making questions cards

/**
 *
 * @param param0 views:fun count the click or views coount so it dosnt neccerlery get from the users
 * @returns
 */
const QuestionsCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}: QuestionProps) => {
  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
      <div className='flex flex-col-reverse items-center justify-between gap-5 sm:flex-row'>
        <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
          {String(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
            {title}
          </h3>
        </Link>

        {/* if signed in add edit and deleted actions */}
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
