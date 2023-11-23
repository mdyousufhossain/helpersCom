import Image from 'next/image'

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
      <h2>No result founded or something unexpected occured </h2>
      <p>
        Be first to break the silence Ask a Questions and kickstart the
        discusstion. our query could be the next big thing others learn from.
        Get involved{' '}
      </p>
    </div>
  )
}
export default NoResult
