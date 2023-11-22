import Link from 'next/link'

const RightSidebar = () => {
  const hotQuestions = [
    { _id: 0, title: 'test' },
    { _id: 1, title: 'test' },
    { _id: 2, title: 'test' },
    { _id: 3, title: 'test' },
    { _id: 4, title: 'test' }
  ]
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col  overflow-y-auto border-l p-6 pt-16 shadow-light-300 dark:[box-shadow:none] max-xl:hidden lg:w-[356px] '>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQuestions.map((item) => (
            <Link
              href={`questions/${item._id}`}
              key={item._id}
              className='flex cursor-pointer items-center justify-between gap-7'
            >
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div></div>
    </section>
  )
}
export default RightSidebar
