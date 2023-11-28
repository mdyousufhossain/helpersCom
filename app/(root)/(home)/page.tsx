import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LocalSearch from '@/components/shared/search/LocalSearch'
import Filter from '@/components/shared/Filter'
import { HomePageFilters } from '@/constants/filters'
import HomeFilter from '@/components/home/HomeFilter'
import NoResult from '@/components/shared/NoResult'
import QuestionsCard from '@/components/cards/QuestionsCard'
import { formatNumber } from '@/lib/utils'

const questions = [
  {
    _id: '1',
    title: 'How to use TypeScript with React?',
    tags: [
      { _id: 'tag1', name: 'TypeScript' },
      { _id: 'tag2', name: 'React' }
    ],
    author: {
      _id: 'author1',
      name: 'John Doe',
      picture: 'john-doe.jpg'
    },
    upvotes: 16000,
    views: 56000,
    answers: [
      {
        /* answer object here */
      },
      {
        /* answer object here */
      }
    ],
    createdAt: new Date('2020-11-25T12:00:00')
  },
  {
    _id: '2',
    title: 'What are the best practices for coding in JavaScript?',
    tags: [
      { _id: 'tag3', name: 'JavaScript' },
      { _id: 'tag4', name: 'Best Practices' }
    ],
    author: {
      _id: 'author2',
      name: 'Jane Smith',
      picture: 'jane-smith.jpg'
    },
    upvotes: 789013,
    views: 2670185,
    answers: [
      {
        /* answer object here */
      }
    ],
    createdAt: new Date('2019-1-10')
  },
  {
    _id: '3',
    title: 'How to deploy a Node.js app on Heroku?',
    tags: [
      { _id: 'tag5', name: 'Node.js' },
      { _id: 'tag6', name: 'Heroku' }
    ],
    author: {
      _id: 'author3',
      name: 'Alice Johnson',
      picture: 'alice-johnson.jpg'
    },
    upvotes: 2510215,
    views: 10520120,
    answers: [
      {
        /* answer object here */
      },
      {
        /* answer object here */
      }
    ],
    createdAt: new Date('1713-11-25T12:00:00')
  },
  {
    _id: '4',
    title: 'What are the latest features in ECMAScript 2022?',
    tags: [
      { _id: 'tag7', name: 'ECMAScript' },
      { _id: 'tag8', name: 'JavaScript' }
    ],
    author: {
      _id: 'author4',
      name: 'Bob Williams',
      picture: 'bob-williams.jpg'
    },
    upvotes: 12,
    views: 110,
    answers: [
      {
        /* answer object here */
      },
      {
        /* answer object here */
      }
    ],
    createdAt: new Date('2023-11-25T12:00:00')
  }
  // Add more questions as needed
]

export default function Home () {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions </h1>
        <Link href={'/ask-question'} className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherclasses='flex-1'
        />
        <Filter
          filters={HomePageFilters}
          otherclasses='min-h-[56px] sm:min-w-[170px]'
          containerclasses='hidden max-md:flex'
        />
      </div>
      <HomeFilter />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* looping through question */}
        {questions.length > 0
          ? (
              questions.map((question) => (
            <QuestionsCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={formatNumber(question.upvotes)}
              views={formatNumber(question.views)}
              answers={question.answers}
              createdAt={question.createdAt}
            />
              ))
            )
          : (
          <NoResult
            title=' No result founded or something unexpected occured 🚀'
            description='Be first to break the silence Ask a Questions and kickstart the
          discusstion. our query could be the next big thing others learn from.
          Get involved💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
            )}
      </div>
    </>
  )
}
