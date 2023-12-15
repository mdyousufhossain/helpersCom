import Image from 'next/image'
import { Input } from '@/components/ui/input'

const GlobalSearch = () => {
  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden'>
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
        <Image
          src='/assets/icons/search.svg'
          width={24}
          height={24}
          className='cursor-pointer'
        />
        <Input
          type='text'
          placeholder='Search globally'
          // value=''
          className='placeholder background-light800_darkgradient [box-shadow-none]  border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent'
        />
      </div>
    </div>
  )
}
export default GlobalSearch
