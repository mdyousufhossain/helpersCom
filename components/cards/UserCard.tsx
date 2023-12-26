import Link from "next/link"

interface Props {
  user: {
    _id: string
    clerkId: string
    picture: string
    name: string
    username: string
  }
}

const UserCard = ({ user }: Props) => {
  return (
    <Link href={`/profile/${user.clerkId}`} >
    
    </Link>
  )
}
export default UserCard
