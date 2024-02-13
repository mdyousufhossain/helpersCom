import Link from 'next/link'
import Image from 'next/image'
import RenderTag from './RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import { getTopPopularTags } from '@/lib/actions/tag.actions'

const RightSidebar = async () => {
  const topQuestions = await getHotQuestions()
  const popularTags = await getTopPopularTags()

  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col  overflow-y-auto border-l p-6 pt-16 shadow-light-300 dark:[box-shadow:none] max-xl:hidden lg:w-[356px] '>
      <div>
        <h3 className='h3-bold text-dark200_light900 pt-16'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {topQuestions.map((question) => (
            <Link
              href={`question/${question._id}`}
              key={question._id}
              className='flex cursor-pointer items-center justify-between gap-7'
            >
              <p className='body-medium text-dark500_light700'>{question.title}</p>

              <Image
                src='/assets/icons/chevron-right.svg'
                alt='chevron right'
                width={20}
                height={20}
                className='invert-colors'
              />
            </Link>
          ))}
        </div>
      </div>

      {/* tag */}
      <div className='mt-7 flex flex-col gap-4'>
        <div>
          <h3 className='h3-bold text-dark200_light900 '>Populer Tag</h3>
        </div>
        <div className='mt-7 flex flex-col gap-4'>
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export default RightSidebar
