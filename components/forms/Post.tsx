'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BlogSchema } from '@/lib/validation'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from '@/constants/ThemeProvider'
import { Badge } from '../ui/badge'
import { createBlogPost } from '@/lib/actions/blog.action'

/**
 * @param { userid, type , path ,post }
 * @returns { posts , edited }
 *
 * @todo make a form that takes title and content and tags
 *       it will have user author and comment functionality
 *       comment replay will be added in future ..
 * @need user post data , author profile data , post upvote data , post created date
 */
interface Props {
    userId : string
    type : string
}

const Post = ({ userId, type } : Props) => {
  const editorRef = useRef(null)
  const { mode } = useTheme()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const router = useRouter()
  // const pathname = usePathname()

  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: []
    }
  })

  async function onSubmit (values:z.infer<typeof BlogSchema>) {
    setIsSubmiting(true)

    try {
      // adds info
      /**
       * @todo add if statment to edit and post editor
       *
       */
      await createBlogPost({
        title: values.title,
        content: values.content,
        tags: values.tags, // Initialize tags as an empty array
        author: JSON.parse(userId)
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault()
      const tagInput = e.target as HTMLInputElement
      const tagValue = tagInput.value.trim()
      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 charadcter'
          })
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue])
          tagInput.value = ''
          form.clearErrors('tags')
        } else {
          form.trigger()
        }
      }
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag)

    form.setValue('tags', newTags)
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
                <FormLabel className='paragraph-semibold text-dark200_light900'>
                  Your Post Title
                  <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    placeholder='Write down How may people help you'
                    {...field}
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark400_light700 min-h-[56px] border'
                  />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Be specefic help people understand
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3 '>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Describe With Your Creativity
                  <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Editor
                    // we will use env in prod
                    apiKey='1x8nevlh5yx7pbaw5gscn0grh7s8jwtg8n4kd5abphj23fxk'
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}

                    initialValue={''}

                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table'
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist  ',
                      content_style:
                        'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light'
                    }}
                  />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Write minimum 120 character
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
         <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Add tags
                  <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <>
                    <Input
                      placeholder='Add tags'
                      onKeyDown={(e) => handleInputKeyDown(e, field) } // (e) => handleInputKeyDown(e, field)
                      disabled={type === 'Edit'}
                      className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark400_light700 min-h-[56px] border'
                    />

                    {field.value.length > 0 && (
                      <div className='flex-start  mt-2.5 gap-2.5'>
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize'
                            onClick={() => handleTagRemove(tag, field)} // handleTagRemove(tag, field) : () => {} handleTagRemove(tag, field) : () => {}
                          >
                            {tag}
                            { type !== 'Edit' && (<Image
                              src='/assets/icons/close.svg'
                              alt='Close icon'
                              width={12}
                              height={12}
                              className='cursor-pointer object-contain invert-0 dark:invert'
                            />)}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Add at least 1 tags to your description . you need to press . Maximum upto 3 tags
                </FormDescription>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className='primary-gradient !text-dark200_light900'
            disabled={isSubmiting}
          >
            {
              isSubmiting
                ? (
              <>{type === 'Edit' ? 'Editing...' : 'Posting...'}</>
                  )
                : (
              <>{type === 'Edit' ? 'Edit Questions' : 'Ask a Questions'}</>
                  )}
          </Button>
        </form>
      </Form>
    </div>

  )
}
export default Post
