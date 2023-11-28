'use client'

import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
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
import { Badge } from '../ui/badge'
import Image from 'next/image'

const Questions = () => {
  const editorRef = useRef(null)
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
            message: 'Tag must be less than 15 charadcter',
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
                  <Input
                    placeholder='Write down How may people help you'
                    {...field}
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 min-h-[56px] border'
                  />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Be specefic help people understand your Question
                </FormDescription>
                <FormMessage className='text-red-500' />
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
                  <Editor
                    // we will use env in prod
                    apiKey='1x8nevlh5yx7pbaw5gscn0grh7s8jwtg8n4kd5abphj23fxk'
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    initialValue='<p>This is the initial content of the editor.</p>'
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
                        'table',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist  ',
                      content_style:
                        'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
                    }}
                  />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Introduce the problem and put in the title with minimum of 20
                  characters.
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
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 min-h-[56px] border'
                  />

                  {field.value.length > 0 && (
                    <div className='flex-start  mt-2.5 gap-2.5'>
                      {field.value.map((tag: any) => (
                        <Badge key={tag} className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize'>
                          {tag}
                          <Image
                            src='/assets/icons/close.svg'
                            alt='Close icon'
                            width={12}
                            height={12}
                            className='cursor-pointer object-contain invert-0 dark:invert'
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                  </>
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Add atleast 3 tags to your description . you need to press
                  enter to add a tag
                </FormDescription>
                <FormMessage className='text-red-500' />
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
