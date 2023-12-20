import Questions from '@/components/forms/Questions'
import { getUserById } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
// import { auth } from '@clerk/nextjs/server'
const Page = async () => {
  // const { userId } = auth()
  const userId = '123456'

  if (!userId) redirect('/sign-in')

  const mongoUser = await getUserById(userId)

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a Questions</h1>
      <div className='mt-9'>
        <Questions mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  )
}

export default Page
