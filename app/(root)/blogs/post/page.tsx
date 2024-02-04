import Post from '@/components/forms/Post'
import { getUserById } from '@/lib/actions/user.action'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'

const page = async ({ params }:ParamsProps) => {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })

  return (
    <>
    <Post userId={JSON.stringify(mongoUser)} type='nothing' />
    </>
  )
}
export default page
