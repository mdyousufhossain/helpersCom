import Link from 'next/link'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='h1-bold text-dark100_light900  max-w-md text-center'>This page is under development </h1>
      <Link href={'/'}>
        <p className="body-regular my-3.5 max-w-md text-center text-blue-400 hover:cursor-pointer"> {'>'} home page</p>
      </Link>
    </div>
  )
}

// this is for the dev
export default page
