import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import Image from 'next/image'
import Link from 'next/link'
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/assets/icons/hamburger.svg'
          width={36}
          height={36}
          alt='menu'
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className='background-light900_dark200 border-none'
      >
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src='/assets/images/site-logo.svg'
            width={23}
            height={23}
            alt='Devflow'
          />

          <p className='h2-bold text-dark100_light900 font-spaceGrotesk'>
            Helper<span className='text-primary-500'>.Com</span>
          </p>
        </Link>
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav
