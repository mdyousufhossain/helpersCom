'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import { ProfileSchema } from '@/lib/validation'
import { usePathname, useRouter } from 'next/navigation'
import { updateUser } from '@/lib/actions/user.action'
import { toast } from '../ui/use-toast'

interface Params {
  clerkId: string
  user: string
}

const Profile = ({ clerkId, user }: Params) => {
  const parsedUser = JSON.parse(user)
  const [isSubmiting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioWebsite: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || ''
    }
  })

  async function onSubmit (values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true)

    try {
      // update user server actions

      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio
        },
        path: pathname
      })
      router.back()
      return toast({
        title: 'Update successfull',
        description: 'Your information updated the way you wanted '
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-9 flex w-full flex-col gap-9 '
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Name <span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your name'
                    className='no-focus paragraph-regular light-border-2  background-light700_dark300 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Username <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your user name'
                    className='no-focus paragraph-regular light-border-2  background-light700_dark300 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='portfolioWebsite'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Portfolio link<span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    placeholder='Your portfoilo URL'
                    className='no-focus paragraph-regular light-border-2  background-light700_dark300 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  location<span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Where are you from ? '
                    className='no-focus paragraph-regular light-border-2  background-light700_dark300 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800 '>
                  Bio<span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Whats your speciality'
                    className='no-focus paragraph-regular light-border-2  background-light700_dark300 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-7 flex justify-end'>
            <Button
              type='submit'
              className='primary-gradient w-fit'
              disabled={isSubmiting}
            >
              {isSubmiting ? 'Saving..' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
export default Profile
