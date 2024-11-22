'use client'

import React, { FC } from 'react'

import { User } from '../schemas/UserSchema'

import { signOut } from 'next-auth/react'

import Image from 'next/image' 

import ThemeControl from './ThemeControl'

export interface ProfilePopUpProps {
  userData: User, 
  showMenu: boolean, 
  handleImageModalClick: (data: string[]) => void
}


const ProfilePopUp: FC<ProfilePopUpProps> = ({ userData, showMenu, handleImageModalClick }) => {  
 
  const handleSignOut = async () => { 
    signOut()
  }

  return (
    <div  
      className={` ${showMenu ? "scale-100" : "scale-0"} duration-300 origin-top-right
        absolute top-[86px] right-0 shadow-lg border backdrop-blur-sm 
        w-[96vw] md:w-[330px] max-h-[70vh] rounded-2xl z-50
        flex flex-col pb-8 
      `}
    > 
      <div
        className='flex flex-col items-center justify-center pt-8 pb-6 rounded-t-2xl bg-base-300'  
        >
        <Image src={userData?.image} width={100} height={100} className='rounded-lg' alt="userImage" />
        <h1 className='text-xl font-semibold mt-5'>{userData?.displayName}</h1>
        <p className='text-sm mt-2 select-all italic'>{userData?.email}</p> 
      </div>

      <div className=' w-full my-4 bg-base-100/80'/>

      <div
        className='flex flex-col items-start justify-start max-h-[50vh] overflow-y-auto backdrop-blur-xl px-6 bg-base-100/80'
      > 
        <ThemeControl/>
        {/* {[1,2,3,4,5].map((item, index) => (
          <button
            key={index} onClick={()=>handleImageModalClick([""])}
            className=' w-full h-12 border-gray-300 hover:bg-blue-400 hover:text-white first:rounded-t-2xl' 
          >   
            <p className=' font-semibold'>Option {item}</p>
          </button>
        ))} */}

        {/* logout */}
        <button
          className='w-full flex items-center justify-center gap-3 h-12 border-gray-300 mt-2 hover:bg-red-400 hover:border-red-400 hover:text-white rounded-b-2xl'
          onClick={() => {handleSignOut()}}
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
