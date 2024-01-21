import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUserinfo } from '@/lib/actions/user.action'
import { getJoinedDate } from '@/lib/utils'
import { URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth()
  const userInfo = await getUserinfo({ userId: params.id })

  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Image
            src={userInfo?.user.picture}
            alt='profile picture'
            width={140}
            height={140}
            className='rounded-full object-cover'
          />
          <div className='mt-3'>
            <h3>{userInfo.user.name}</h3>
            <p className='paragraph-regular text-dark200_light800'>@{userInfo.user.username}</p>

            <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
              {userInfo.user.locaion && <>Location</>}

              {getJoinedDate(userInfo.user.joinedAt)}
            </div>

            {userInfo.user.bio && <p >{userInfo.user.bio}</p>}
          </div>
        </div>

        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href='/profile/edit'>
                <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3 '>
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      {/* stats */}
      <div className='mt-10 flex gap-10'>
        <Tabs defaultValue='top-post' className='flex-1'>
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger value='top-post'>Top Posts</TabsTrigger>
            <TabsTrigger value='answers'>Top Answers</TabsTrigger>
          </TabsList>
          <TabsContent value='top-posts'>
            Posts
          </TabsContent>
          <TabsContent value='answer'>Answrs</TabsContent>
        </Tabs>
      </div>
    </>
  )
}
export default Page
