/* eslint-disable comma-dangle */
'use client'

import React, { useRef, useState } from 'react'
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
import { createQuestion, editQuestions } from '@/lib/actions/question.action'

import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from '@/constants/ThemeProvider'
import { toast } from '../ui/use-toast'
/**
 *
 * @returns 'javascript',"funcitonal programming",'algorithm
 * @todo add handleTagfunction
 * @todo add handleRemovefunciton
 *
 *@todo making form tag reusable required usetate and form
 */

interface Props {
  mongoUserId: string
  typed?:string
  questionDetails:string
}
const Questions = ({ mongoUserId, typed, questionDetails }: Props) => {
  const { mode } = useTheme()
  const editorRef = useRef(null)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  // 1. Define your form.

  const parsedQuestionDetails = typed === 'Edit' ? JSON.parse(questionDetails) : ''
  const groupedTags = typed === 'Edit' ? parsedQuestionDetails.tags.map((tag: { name: any }) => tag.name) : ''

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails.title || '',
      explanation: parsedQuestionDetails.content || '',
      tags: groupedTags || [],
      type: 'question'
    },
  })

  // 2. Define a submit handler.
  async function onSubmit (values: z.infer<typeof QuestionsSchema>) {
    setIsSubmiting(true)
    try {
      if (typed === 'Edit') {
        await editQuestions({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname
        })
        router.push(`/question/${parsedQuestionDetails._id}`)
        return toast({
          title: 'Question Edit successfull',
          description: 'wow you editing the questions!'
        })
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          type: 'question',
          path: pathname
        })
        router.push('/')
        return toast({
          title: 'Question created successfull',
          description: 'wow you asked a questions!'
        })
      }
    } catch (error) {
    } finally {
      setIsSubmiting(false)
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
                  Question Title
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
                  Detail explanation of your Question
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
                    initialValue={parsedQuestionDetails.content || ''}

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
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
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
                      disabled={typed === 'Edit'}
                      className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark400_light700 min-h-[56px] border'
                    />

                    {field.value.length > 0 && (
                      <div className='flex-start  mt-2.5 gap-2.5'>
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className='subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize'
                            onClick={() => typed !== 'Edit' ? handleTagRemove(tag, field) : () => {}}
                          >
                            {tag}
                            { typed !== 'Edit' && (<Image
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
                  Add atleast 3 tags to your description . you need to press
                  enter to add a tag
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
            {isSubmiting
              ? (
              <>{typed === 'Edit' ? 'Editing...' : 'Posting...'}</>
                )
              : (
              <>{typed === 'Edit' ? 'Edit Questions' : 'Ask a Questions'}</>
                )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Questions
