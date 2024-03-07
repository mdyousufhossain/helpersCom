'use client'

import { Button } from '../ui/button'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { formUrlQuery } from '@/lib/utils'

const HomeFilter = ({ filters }:any) => {
  const searchParams = useSearchParams()

  const [active, setActive] = useState('')

  const router = useRouter()

  const handleClick = (item:string) => {
    if (active === item) {
      setActive('')
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null
      })
      router.push(newUrl, { scroll: false })
    } else {
      setActive(item)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase()
      })
      router.push(newUrl, { scroll: false })
    }
  }
  return (
    <div className='max-md::hidden mt-10 flex flex-wrap gap-3  max-md:hidden'>
      {filters.map((item:any) => (
        <Button
          key={item.value}
          onClick={() => handleClick(item.value)}
          className={`body-medium [box-shadow-none] rounded-lg px-6 py-3 capitalize ${
            active === item.value
              ? ' bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500 hover:bg-light-500 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500'
          } `}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}
export default HomeFilter
