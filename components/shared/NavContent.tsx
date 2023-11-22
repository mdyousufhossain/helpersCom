'use client'

import { sidebarLinks } from '@/constants'
import { SheetClose } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
/**
 *
 *
 * @todo make this reusable for both mobile and leftside
 *
 * @params : input the leftbar aka tab and lg screen style and mobile style
 * @issue : dialog error having
 * @erro : DialogClose` must be used within `Dialog`
 */

const NavContent = () => {
  const pathname = usePathname()
  return (
    <section className='flex h-full flex-col gap-6 pt-16'>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route
        console.log(isActive)
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? ' ' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}

export default NavContent
