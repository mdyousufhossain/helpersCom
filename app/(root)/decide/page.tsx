import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex w-full flex-col justify-between gap-4'>
      <h1 className='h1-bold text-dark100_light900 capitalize'>
        start the wheel of your keyboard{' '}
      </h1>
      <p className='body-regular text-dark500_light700 my-3.5 max-w-md '>
        Ask a question or write a blog
      </p>

      {/* <Link
              href={'/ask-question'}
              className='flex justify-end max-sm:w-full'
            >
              <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
                Ask a Question
              </Button>
            </Link>
            <Link
              href={'/post'}
              className='flex justify-end max-sm:w-full'
            >
              <Button className='min-h-[46px] bg-green-400 px-4 py-3 !text-light-900'>
                Write  a Blog
              </Button>
            </Link> */}
      <div className='flex w-full flex-col justify-around gap-4 lg:flex-row'>
        <div className='hover:light-gradient-decide-question dark:hover:dark-gradient-decide-question flex h-[400px] flex-col items-center justify-center gap-2 rounded-[10px] border-2 transition-all duration-500 ease-in-out hover:scale-100  hover:brightness-110 dark:border-[#411457d4] lg:w-2/4'>
        <Link
            href={'/ask-question'}
            className='flex flex-col items-center'
          >
          <Image
            src='/assets/images/questionlight.svg'
            alt='No result illustration'
            width={270}
            height={200}
            className='block object-contain dark:hidden'
          />
          <Image
            src='/assets/images/questiondark.svg'
            alt='No result illustration'
            width={270}
            height={200}
            className='hidden object-contain dark:flex'
          />
            <Button className='primary-gradient min-h-[46px] w-full px-4 py-3 !text-light-900'>
              Ask a Question
            </Button>
          </Link>
        </div>
        <div className='hover:light-gradient-decide-blog dark:hover:dark-gradient-decide-blog hover:[shadow-lg] flex h-[400px] flex-col items-center justify-center gap-2 rounded-[10px] border-2 transition duration-500 ease-in-out  hover:scale-100 hover:brightness-110 dark:border-[#411457d4] lg:w-2/4'>
        <Link href={'/post'}
        className='flex flex-col items-center'
        >
          <Image
            src='/assets/images/bloglight.svg'
            alt='No result illustration'
            width={270}
            height={200}
            className='block object-contain dark:hidden'
          />
          <Image
            src='/assets/images/blogdark.svg'
            alt='No result illustration'
            width={270}
            height={200}
            className='hidden object-contain dark:flex'
          />
            <Button className='min-h-[46px] w-full bg-green-400 px-4 py-3 !text-light-900'>
              Write a Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default page
