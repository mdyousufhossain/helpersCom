import { getUserPosts } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import QuestionsCard from '../cards/QuestionsCard'

interface Props extends SearchParamsProps {
    userId : string
    clerkId?:string
}

const PostsTab = async ({ searchParams, userId, clerkId } : Props) => {
  const result = await getUserPosts({
    userId,
    page: 1
  })
  return (
    <div>{result.questions.map((item) => (
        <QuestionsCard
        key={item._id}
        _id={item._id}
        clerkId={clerkId}
        title={item.title}
        tags={item.tags}
        author={item.author}
        upvotes={item.upvotes}
        views={item.views}
        answers={item.answers}
        createdAt={item.createdAt} type={'Post'}/>
    ))}</div>
  )
}
export default PostsTab
