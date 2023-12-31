import { getQuestionsById } from '@/lib/actions/question.action'
import Link from 'next/link'
import Image from 'next/image'
const Page = async ({ params, searchParams }) => {
  const result = await getQuestionsById({ questionId: params.id })

  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link href={`/profile/${result.author.clerkId}`}>
            <Image
              src={result.author.picture}
              width={22}
              height={22}
              alt={`${result.author.name}s profile picture`}
            />
            <p className='paragraph-semibold text-dark300_light700'>
              {result.author.name}
            </p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page
