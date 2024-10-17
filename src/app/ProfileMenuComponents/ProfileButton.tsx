import React, { FC } from 'react' 

import { UserDataFromGoogleSchema } from '../Schema' 

import Image from 'next/image'

export interface ProfileButtonProps {
    userData: UserDataFromGoogleSchema,
    handleMenuClick: () => void;
    showMenu: boolean 
}

const ProfileButton: FC<ProfileButtonProps> = ({ userData, handleMenuClick, showMenu }) => { 
  
  return (
    <div 
        className={` 
            cursor-pointer w-full h-full 
        `}
        onClick={()=>handleMenuClick()}
    >
      <Image 
        className={` 
            ${showMenu ? " border-blue-500 " : " border-transparent hover:border-blue-300 tooltip "}
            border-4 w-full h-full  rounded-full duration-300 shadow-md shadow-gray-400 
            tootltip-left 
        `} data-tip="Profile" width={24} height={24} 
          src={userData?.image} alt={userData?.name} 
        />
    </div>
  )
}

export default ProfileButton
