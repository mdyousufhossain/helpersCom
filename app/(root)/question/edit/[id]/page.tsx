import Questions from '@/components/forms/Questions'
import { getQuestionsById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'

const page = async ({ params }:ParamsProps) => {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionsById({ questionId: params.id })
  return (
    <>
    <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

    <div className="mt-9">
      <Questions typed='Edit' mongoUserId={JSON.stringify(mongoUser)} questionDetails={JSON.stringify(result)} />
    </div>
    </>
  )
}
export default page
