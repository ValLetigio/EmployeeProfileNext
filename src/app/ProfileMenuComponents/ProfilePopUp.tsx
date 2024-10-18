'use client'

import React, { FC } from 'react'

import { UserDataFromGoogleSchema } from '../Schema' 
import { signOut } from 'next-auth/react'

import Image from 'next/image'

export interface ProfilePopUpProps {
  userData: UserDataFromGoogleSchema, 
  showMenu: boolean
}


const ProfilePopUp: FC<ProfilePopUpProps> = ({ userData, showMenu }) => {  

  return (
    <div 
      className={` ${showMenu ? "scale-100" : "scale-0"} duration-300 origin-top-right
        absolute top-[86px] right-0 shadow-md shadow-gray-400 border backdrop-blur-sm 
        w-[96vw] md:w-[330px] max-h-[70vh] rounded-2xl z-50
        flex flex-col pb-8
      `}
    > 
      <div className='flex flex-col items-center justify-center pt-8 pb-6 rounded-t-2xl bg-gray-100 ' >
        <Image src={userData?.image} width={100} height={100} className='rounded-lg' alt="userImage" />
        <h1 className='text-xl font-semibold mt-5'>{userData.name}</h1>
        <p className='text-sm mt-2 select-all italic'>{userData.email}</p> 
      </div>

      <div className='border-b w-full mb-4'/>

      <div
        className='flex flex-col items-center justify-center max-h-[30vh] '
      > 
        {[1,2,3,4,5].map((item, index) => (
          <button
            key={index}
            className=' w-3/4 h-12 border-gray-300 hover:bg-blue-400 hover:text-white first:rounded-t-2xl' 
          >
            <p className=' font-semibold'>Option {item}</p>
          </button>
        ))}

        {/* logout */}
        <button
          className='flex items-center justify-center gap-3 w-3/4 h-12 border-gray-300 mt-2 hover:bg-red-400 hover:border-red-400 hover:text-white rounded-b-2xl'
          onClick={() => {signOut() }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
 
          <p className=' font-semibold'>Sign out</p>
        </button>
      </div>


    </div>
  )
}

export default ProfilePopUp
