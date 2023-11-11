/* eslint-disable comma-dangle */
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import Theme from './Theme'

const Navbar = () => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <nav className='flex-between background-light900_dark200 dark:shadow-none sm:px-12 fixed z-50 w-full gap-5 p-6 shadow-light-300'>
      <Link href='/' className='flex items-center gap-1'>
        <Image
          src='/assets/images/site-logo.svg'
          width={23}
          height={23}
          alt='Devflow'
        />

        <p className='h2-bold max-sm:hidden font-spaceGrotesk text-dark-100 dark:text-light-900'>
          Helper<span className='text-primary-500'>Com</span>
        </p>
      </Link>

      {/* global */}

      <div className='flex-between gap-5'>
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avaterBox: 'h-10',
              },
              variables: {
                colorPrimary: '#ff7000',
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  )
}
export default Navbar
