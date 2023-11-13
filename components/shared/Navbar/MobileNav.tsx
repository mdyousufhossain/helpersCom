/* eslint-disable tailwindcss/no-custom-classname */
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import { SignedOut } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
const NavContent = () => {
  return (
    <section className='flex h-full flex-col gap-6 pt-16'>
      {sidebarLinks.map((item) => {
        return (
          <SheetClose asChild key={item.route}>
            <Link href={item.route} className=''>
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p>{item.label}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}

const MobileNav = () => {
  // reusable funciton

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/assets/icons/hamburger.svg'
          width={36}
          height={36}
          alt='menu'
          className='invert-colors xs:hidden'
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
        <SheetClose asChild>
          <NavContent />
        </SheetClose>

        <SignedOut>
          <div className='flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href='/sign-in'>
                <Button className='small-medium btn-secondary shadow-none min-h-[41px] w-full rounded-lg px-4 py-3'>
                  <span className='primary-text-gradient'>Log in</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href='/sign-up'>
                <Button
                  className='small-medium light-border-2
                btn-tertiary shadow-none min-h-[41px] w-full rounded-lg px-4 py-3'
                >
                  <span className='primary-text-gradient'>Sign-up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav
