'use client'
import Image from "next/image"



interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: string
  hasupVoted: string
  downvotes: number
  hasdownVoted: boolean
  hasSaved?: boolean
}

const Voting = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved
}: Props) => {
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
            <Image src={
              hasupVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
              width={18}
              height={18}
              alt="upvote"
              className="cursor-pointer"
              onClick={() => {}}
              />

              <div className='flex-center'></div>
        </div>
      </div>
    </div>
  )
}
export default Voting
