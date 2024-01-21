import { getUserinfo } from '@/lib/actions/user.action'
import { URLProps } from '@/types'

const Page = async ({ params, searchParams } :URLProps) => {
  const userInfo = await getUserinfo({ userId: params.id })
  
  return (
    <div>{params.id}</div>
  )
}
export default Page
