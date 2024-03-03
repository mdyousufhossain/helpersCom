import * as z from 'zod'

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be more than 5 character')
    .max(130, 'title is too long'),
  explanation: z.string().min(50, 'Dont be shy explain a bit more'),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
  type: z.string()
    .min(2, 'Title must be more than 5 character')
    .max(20, 'title is too long')
})

// new start of the next chapter aka backend
export const AnswerSchema = z.object({ answer: z.string().min(100) })
export const CommentSchema = z.object({ comment: z.string().min(100) })

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50)
})

export const BlogSchema = z.object({
  title: z.string().min(4, 'Title must be more that 3 letter')
    .max(120, 'title cannot be this long'),
  content: z.string().min(120, 'a Post must be larger than 120 character'),
  tags: z.array(z.string().min(3).max(15)).min(1).max(3),
  type: z.string()
    .min(2, 'Title must be more than 5 character')
    .max(20, 'title is too long')
})
