'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { QuestionsSchema } from '@/lib/validation'

const Questions = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-10'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                    Question Title
                    <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input placeholder='Write down How may people help you' {...field} className='no-focus paragraph-regular background-light900_dark300 light-border-2 min-h-[56px] border' />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Be specefic help people understand your Question
                </FormDescription>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='explanation'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3 '>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                    Detail explanation of your Qoustion 
                    <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  {/* {@todo : add an editor component} */}
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Introduce the problem and put in the title with minimum of 20 characters.
                </FormDescription>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='Tags'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                    Add tags
                    <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input placeholder='Add tags' {...field} className='no-focus paragraph-regular background-light900_dark300 light-border-2 min-h-[56px] border' />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Add atleast 3 tags to your description . you need to press enter to add a tag
                </FormDescription>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Questions
