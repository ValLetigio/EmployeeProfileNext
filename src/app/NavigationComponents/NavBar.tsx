"use client";

import React, { useState } from "react";

import Menu from "./Menu";
import MenuButton from "./MenuButton";
import HomeButton from "./HomeButton";
import DashboardButton from "./DashboardButton"; 

import { useAppContext } from "../GlobalContext"; 

function NavBar() { 

  const [showMenu, setShowMenu] = useState(false);

  const { cards, pathname, userData } = useAppContext();

  console.log(userData, "userData");

  return (
    <div
      className={`shadow-lg shadow-gray-400 hover:bg-gray-100/50 rounded-full backdrop-blur-sm
        fixed bottom-4 md:bottom-6 left-1/2 right-1/2 translate-x-[-50%] 
        w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]
        flex justify-evenly items-center h-16 border duration-300
        ${userData?.email ? "scale-100" : "scale-0"}
      `}
    >
      
      {/* home button */}
      <HomeButton pathname={pathname}/>

      {/* menu button */}
      <MenuButton setOpen={setShowMenu} open={showMenu} />

      {/* Menu */}  
      {userData?.email ? <Menu open={showMenu} cards={cards} pathname={pathname}/> : null} 

      {/* dashboard button */}
      <DashboardButton pathname={pathname}/> 
    </div>
  );
}

export default NavBar;
