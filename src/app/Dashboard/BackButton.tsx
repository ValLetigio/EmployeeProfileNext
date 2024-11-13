import React from 'react'

import Link from 'next/link'

const BackButton = () => {
  return (
    <Link href={'/'}
        className='
            fixed top-2 left-2 md:top-4 md:left-4 h-12 w-12 text-xl border tooltip tooltip-right
            bg-gray-100/80 hover:border-blue-500 hover:text-blue-500 z-40
            shadow-sm shadow-gray-600 p-4 rounded-full flex items-center justify-normal 
        '
        data-tip="Home"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
      </svg>
    </Link>
  )
}

export default BackButton
