'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/ui/select'
import { formUrlQuery } from '@/lib/utils'
import { useSearchParams, useRouter } from 'next/navigation'

interface Props {
  filters: {
    name: string
    value: string
  }[]
  otherclasses?: string
  containerclasses?: string
}

const Filter = ({ filters, otherclasses, containerclasses }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paramsFilter = searchParams.get('filter')

  const handleUpdate = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value

    })

    router.push(newUrl, { scroll: false })
  }
  return (
    <div className={`relative ${containerclasses}`}>
      <Select
        onValueChange={handleUpdate}
        defaultValue={ paramsFilter || undefined }
      >
        <SelectTrigger
          className={`${otherclasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 `}
        >
          <div className='line-clamp-1 flex-1 text-left'>
            <SelectValue placeholder='Seclect a filter' />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value} className='text-dark500_light700'>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
export default Filter
