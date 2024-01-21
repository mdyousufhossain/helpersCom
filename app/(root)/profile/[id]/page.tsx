import { URLProps } from '@/types'

const Page = ({ params, searchParams } :URLProps) => {
  return (
    <div>{params.id}</div>
  )
}
export default Page
