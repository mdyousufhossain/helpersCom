'use client'
import { HomePageFilters } from '@/constants/filters'
import { Button } from '../ui/button'

const HomeFilter = () => {
  const active = 'newest'

  return (
    <div className='mt-10 flex-wrap gap-3 md:flex  '>
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
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
