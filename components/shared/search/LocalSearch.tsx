import Image from 'next/image'
import { Input } from '@/components/ui/input'

interface customProps {
  route: string
  iconPosition: string
  imgSrc: string
  placeholder: string
  otherclasses: string
}
const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherclasses
}: customProps) => {
  return (
    <div className='relative w-full max-lg:max-w-[400px] max-sm:w-full'>
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-sm px-4'>
        <Image
          src='/assets/icons/search.svg'
          width={24}
          height={24}
          alt={'search pointer'}
          className='cursor-pointer'
        />
        <Input
          type='text'
          placeholder='Search globally'
          value=''
          className='placeholder background-light800_darkgradient [box-shadow-none]  border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent'
        />
      </div>
    </div>
  )
}
export default LocalSearch
