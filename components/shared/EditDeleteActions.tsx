'use client'

import Image from 'next/image'

interface Props {
  type: string
  itemId: string
}

const EditDeleteActions = ({ type, itemId }: Props) => {
  const handleEdit = () => {}
  // const handleDelete = () => {}
  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
      {type === 'Questions' && (
        <Image
          src='/assets/icons/edit.svg'
          alt='edit'
          width={14}
          height={14}
          className='cursor-pointer object-contain'
          onClick={handleEdit}
        />
      )}
    </div>
  )
}
export default EditDeleteActions
