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
            cursor-pointer w-full h-full ${!showMenu && "tooltip-left tooltip  "}
      `}
        onClick={()=>handleMenuClick()}
        data-tip="Profile"
    >
      <Image 
        className={` 
            ${showMenu ? " border-blue-500 " : " border-transparent hover:border-blue-200  "}
            border-4 w-full h-full  rounded-full duration-300 shadow-md shadow-gray-400  
        `}  width={24} height={24} 
          src={userData?.image} alt={userData?.displayName} 
        />
    </div>
  )
}

export default ProfileButton
