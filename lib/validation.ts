import * as z from 'zod'

export const QuestionsSchema = z.object({
  title: z.string()
    .min(5, 'Title must be more than 5 character')
    .max(130, 'title is too long'),
  explanation: z.string().min(50, 'Dont be shy explain a bit more'),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3)
})


// new start of the next chapter aka backend