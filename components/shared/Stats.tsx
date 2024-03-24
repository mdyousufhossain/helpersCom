import { formatNumber } from '@/lib/utils'
import { BadgeCounts } from '@/types'
import Image from 'next/image'
import { Badge } from '../ui/badge'

interface StatsCardProps {
  imgUrl: string
  value: number
  title: string
}

const StatsCard = ({ imgUrl, title, value }: StatsCardProps) => {
  return (
    <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
      <Image src={imgUrl} alt={`${title} icon`} width={40} height={50} />

      <div>
        <p className='paragraph-semibold text-dark200_light900'>
          {value}
        </p>
        <p className='body-medium text-dark400_light700'>{title}</p>
      </div>
    </div>
  )
}

interface Props {
  totalQuestions: number
  totalAnswers: number
  totalPosts: number
  reputation:number
  badgeCounts : BadgeCounts
}

const Stats = ({ totalQuestions, totalAnswers, totalPosts, badgeCounts, reputation }: Props) => {
  return (
    <div className='mt-10'>
      <Badge className='subtle-medium background-light800_dark300 text-dark400_light700 rounded-md border-none px-4 py-2 uppercase'>
        <strong>
        <h4 className='h3-semibold'>Reputation: <span>{reputation}</span> </h4>
        </strong>
    </Badge>
      <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
        <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-2 rounded-md border p-2 shadow-light-300 dark:shadow-dark-200'>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatNumber(totalQuestions)}
            </p>
            <p className='body-medium text-dark400_light700'>Questions</p>
          </div>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatNumber(totalAnswers)}
            </p>
            <p className='body-medium text-dark400_light700'>Answers</p>
          </div>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatNumber(totalPosts)}
            </p>
            <p className='body-medium text-dark400_light700'>Posts</p>
          </div>
        </div>
        <StatsCard
          imgUrl='/assets/icons/gold-medal.svg'
          title='Gold Badges'
          value={badgeCounts.GOLD}
        />
        <StatsCard
          imgUrl='/assets/icons/silver-medal.svg'
          title='Silver Badges'
          value={badgeCounts.SILVER}
        />
        <StatsCard
          imgUrl='/assets/icons/bronze-medal.svg'
          title='Bronze Badges'
          value={badgeCounts.BRONZE}
        />
      </div>
    </div>
  )
}
export default Stats
