import { Schema } from 'mongoose'
import { IUser } from '@/database/user.question'

export interface GetQuestionsParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: string
}

export interface CreateBlogParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path?: string;
}

export interface GetBlogParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: string
}

export interface DeleteBlogParams {
  postId: string
  path: string
}

export interface EditBlogParams {
  postId: string
  title: string
  content: string
  path: string
}

export interface ViewBlogParams {
  postId: string
  userId?: string | undefined
}

export interface GetBlogByIdParams {
  tagId:string
  page?:number
  pageSize?:number
  searchQuery?:string
}

export interface blogVoteParams {
  postId: string
  userId: string
  hasupVoted: boolean
  hasdownVoted: boolean
  path: string
}

export interface CreateCommentsParams {
  content: string
  author: string
  post: string
  path: string
}

export interface CreateAnswerParams {
  content: string
  author: string
  question: string
  path: string
}
export interface CreateQuestionParams {
  title: string
  content: string
  tags: string[]
  author: Schema.Types.ObjectId | IUser
  path?: string
}
export interface ToggleSavePostParams {
  userId: string
  postId: string
  blogId:string
  path: string
}

export interface GetAnswersParams {
  questionId: string
  sortBy?: string
  page?: number
  pageSize?: number
}

export interface AnswerVoteParams {
  answerId: string
  userId: string
  hasupVoted: boolean
  hasdownVoted: boolean
  path: string
}

export interface DeleteAnswerParams {
  answerId: string
  path: string
}
export interface SearchParams {
  query?: string | null
  type?: string | null
}
export interface RecommendedParams {
  userId: string
  page?: number
  pageSize?: number
  searchQuery?: string
}

export interface ViewQuestionParams {
  questionId: string
  userId: string | undefined
}
export interface JobFilterParams {
  query: string
  page: string
}

export interface GetQuestionByIdParams {
  tagId:string
  page?:number
  pageSize?:number
  searchQuery?:string
}
export interface QuestionVoteParams {
  questionId: string
  userId: string
  hasupVoted: boolean
  hasdownVoted: boolean
  path: string
}

export interface DeleteQuestionParams {
  questionId: string
  path: string
}

export interface EditQuestionParams {
  questionId: string
  title: string
  content: string
  path: string
}
export interface GetAllTagsParams {
  page?: number
  pageSize?: number
  filter?: string
  searchQuery?: string
}
export interface GetQuestionsByTagIdParams {
  tagId: string
  page?: number
  pageSize?: number
  searchQuery?: string
}
export interface GetTopInteractedTagsParams {
  userId: string
  limit?: number
}

export interface CreateUserParams {
  clerkId: string
  name: string
  username: string
  email: string
  picture: string
}

export interface GetUserByIdParams {
  userId: string
}
export interface GetAllUsersParams {
  page?: number
  pageSize?: number
  filter?: string
  searchQuery?: string // Add searchQuery parameter
}
export interface UpdateUserParams {
  clerkId: string
  updateData: Partial<IUser>
  path: string
}
export interface ToggleSaveQuestionParams {
  userId: string
  questionId: string
  path: string
}

export interface GetSavedQuestionsParams {
  clerkId: string | null
  page?: number
  pageSize?: number
  filter?: string
  searchQuery?: string
}
export interface GetUserStatsParams {
  userId: string
  page?: number
  pageSize?: number
}
export interface DeleteUserParams {
  clerkId: string
}
