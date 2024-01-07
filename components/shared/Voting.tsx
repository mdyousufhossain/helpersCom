'use client'
import { formatNumber } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  hasupVoted: string
  downvotes: number
  hasdownVoted: boolean
  hasSaved?: boolean
}

const Voting = ({
  type,
  itemId,
  userId,
  downvotes,
  upvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved
}: Props) => {
  const handleSave = () => {

  }

  const handleVote = (action:string) => {
    

  }
  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasupVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt='upvote'
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p> {formatNumber(upvotes)}</p>
          </div>
        </div>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasdownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt='downvote'
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p> {formatNumber(downvotes)}</p>
          </div>
        </div>
      </div>
      <Image
            src={
              hasSaved
                ? '/assets/icons/star-filled.svg'
                : '/assets/icons/star-red.svg'
            }
            width={18}
            height={18}
            alt='star'
            className='cursor-pointer'
            onClick={handleSaved}
          />
    </div>
  )
}
export default Voting
