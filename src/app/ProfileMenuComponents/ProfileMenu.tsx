'use client';

import React, { useState } from 'react';

import { useAppContext } from '../GlobalContext';  

import ProfileButton from './ProfileButton';
import ProfilePopUp from './ProfilePopUp';

const ProfileMenu = () => {

  const { userData, handleImageModalClick, pathname } = useAppContext(); 

  const [ showMenu, setShowMenu ] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  } 

  return (
    <div 
      className={` ${!userData._id || pathname == '/Dashboard' ? "scale-0" : "scale-100"}
        fixed top-2 right-2 md:top-4 md:right-4 h-16 w-16 duration-300 z-50
      `} 
    >   
      <ProfileButton userData={userData} handleMenuClick={handleMenuClick} showMenu={showMenu}/>
      <ProfilePopUp userData={userData} showMenu={showMenu} handleImageModalClick={handleImageModalClick}/>
    </div>
  )
}

export default ProfileMenu
