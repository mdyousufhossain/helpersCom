'use client'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // query params
  const query = searchParams.get('q')

  const [search, setSearch] = useState(query || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search
        })
        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q']
          })
          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, route, pathname, router, searchParams, query])
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
