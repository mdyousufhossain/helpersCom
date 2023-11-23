'use client'
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
  otherclasses,
}: customProps) => {
  return (
    // <div className='relative w-full max-lg:max-w-[400px] max-sm:w-full'>
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-sm px-4 ${otherclasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt={'search icon'}
          className='cursor-pointer'
        />
      )}
      <Input
        type='text'
        placeholder={placeholder}
        value=''
        className='placeholder
          [box-shadow-none]  paragraph-regular no-focus background-light800_darkgradient border-none outline-none focus-visible:ring-0
          focus-visible:ring-transparent
          '
        //   onChange={() => {}}
      />
    </div>
    // </div>
  )
}
export default LocalSearch
