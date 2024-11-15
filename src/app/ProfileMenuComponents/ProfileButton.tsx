import React, { FC } from 'react'  

import { User } from '../schemas/UserSchema';

import Image from 'next/image'
export interface ProfileButtonProps {
    userData: User,
    handleMenuClick: () => void;
    showMenu: boolean 
}

const ProfileButton: FC<ProfileButtonProps> = ({ userData, handleMenuClick, showMenu }) => { 
  
  return (
    <div 
        className={` 
          cursor-pointer w-full h-full ${!showMenu && " tooltip-left tooltip "} 
      `}
        onClick={()=>handleMenuClick()}
        data-tip="Profile"
    >
      <Image 
        fill={true}
        className={`  
          ${showMenu && "border-4 border-blue-500"} 
          w-full h-full duration-300 shadow-md shadow-gray-400 rounded-full  
        `} 
          src={userData?.image} alt={userData?.displayName} 
        />
    </div>
  )
}

export default ProfileButton
