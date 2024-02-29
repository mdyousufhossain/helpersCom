import Post from '@/components/forms/Post'
import { getPostById } from '@/lib/actions/blog.action'
import { getUserById } from '@/lib/actions/user.action'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'

const page = async ({ params }:ParamsProps) => {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })
  const result = await getPostById({ postId: params.id })
  console.log(result)
  return (
    <>
    <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

    <div className="mt-9">
      <Post type='Edit' userId={JSON.stringify(mongoUser)} postDetails={JSON.stringify(result)} />
    </div>
    </>
  )
}
export default page
