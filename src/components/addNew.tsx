import Link from 'next/link'
import React from 'react'

const AddNew = () => {
  return (
    <div>
        <Link href='/home/new' className='fixed bottom-10 right-10 bg-[#1B795D] text-white px-4 py-2 rounded-full shadow-lg transition-colors'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        </Link>
    </div>
  )
}

export default AddNew