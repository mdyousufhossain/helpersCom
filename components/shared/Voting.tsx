'use client'
import { upvoteAnswer, downvoteAnswer, markAnswerAccepted } from '@/lib/actions/answer.action'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import { formatNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
// import { useRouter } from 'next/router'
import { ViewBlog, viewQuestion } from '@/lib/actions/interaction.action'
import { downvotePost, upvotePost } from '@/lib/actions/blog.action'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  hasupVoted: boolean
  downvotes: number
  hasdownVoted: boolean
  hasSaved?: boolean
  isAuth? : boolean
  hasAccepted? : boolean
  questionId:string
  answersId:string
}

/**
 *
 *
 * @todo change fix the router isssue .. its having error of not mounted or something
 * @done its fixed it was problem in import it had to be imported from the navigation
 *
 */

const Voting = ({
  type,
  itemId,
  userId,
  downvotes,
  upvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
  isAuth,
  hasAccepted,
  questionId,
  answersId
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname
    })
  }
  const handleAcceptSolution = async () => {
    await markAnswerAccepted({
      questionid: JSON.parse(questionId),
      answerid: JSON.parse(answersId),
      path: pathname,
      answerAuthor: ''
    })
    window.location.reload()
  }

  /**
   *
   * @param action 'upvote'
   * @returns  upvoteing the post or comment
   *
   * @param action : downvote
   * @return downvoteing the post or comment
   *
   * cons : too many if statement we can use case statment including the if statment but that would more spegitify
   */

  const handleVote = async (action: string) => {
    if (!userId) {
      return
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === 'Post') {
        await upvotePost({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      }

      /**
       * @todo do a toaster
       */
      return
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === 'Post') {
        await downvotePost({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      }
    }
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined
    })

    ViewBlog({
      userId: userId ? JSON.parse(userId) : undefined,
      postId: JSON.parse(itemId)
    })
  }, [itemId, userId, pathname, router])
  return (
    <>
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
            <p className='subtle-medium text-dark400_light900'>
              {' '}
              {formatNumber(upvotes)}
            </p>
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
            <p className='subtle-medium text-dark400_light900'>
              {' '}
              {formatNumber(downvotes)}
            </p>
          </div>

        </div>
      </div>
      {type === 'Question'
        ? (
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
          onClick={handleSave}
        />
          )
        : ('')}
{
  isAuth && !hasAccepted && (
      <Popover>
          <PopoverTrigger>
          <Button className='min-h-[46px] bg-green-700 px-4 py-3 !text-light-900'>
           Accept it as solution
          </Button>
          </PopoverTrigger>
          <PopoverContent className='flex justify-around gap-2 border-none'>
          <Button className=' min-h-[46px] bg-green-400 px-4 py-3 !text-light-900' onClick={() => handleAcceptSolution()}>
           Confirm mark as solution
          </Button>
          </PopoverContent>
        </Popover>)
}

{
  hasAccepted && (
    <Image
    src={'/assets/icons/done-all.svg'}

    width={18}
    height={18}
    alt='checkmark'
    />
  )

}
    </div>
    </>
  )
}
export default Voting
