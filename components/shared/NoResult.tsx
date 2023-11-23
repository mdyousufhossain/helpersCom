import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const NoResult = () => {
  return (
    <div className='mt-10 flex w-full flex-col items-center '>
      <Image
        src='/assets/images/light-illustration.png'
        alt='No result illustration'
        width={270}
        height={200}
        className='block object-contain dark:hidden'
      />
      <Image
        src='/assets/images/dark-illustration.png'
        alt='No result illustration'
        width={270}
        height={200}
        className='hidden object-contain dark:flex'
      />
      <h2 className='h2-bold text-dark200_light900 mt-8'>
        No result founded or something unexpected occured 🚀
      </h2>
      <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>
        Be first to break the silence Ask a Questions and kickstart the
        discusstion. our query could be the next big thing others learn from.
        Get involved💡
      </p>
      <Link href='/'>
        <Button
          className='paragraph-medium mt-5 min-h-[46px]
        rounded-lg bg-primary-500 p-4 text-light-900 dark:text-light-900'
        >
          Ask Question
        </Button>
      </Link>
    </div>
  )
}
export default NoResult
