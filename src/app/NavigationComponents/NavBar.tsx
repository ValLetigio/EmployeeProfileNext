"use client";

import React, { useState } from "react";

import Menu from "./Menu";
import MenuButton from "./MenuButton";
import HomeButton from "./HomeButton";
import DashboardButton from "./DashboardButton"; 

import NavBarSkeleton from "./NavBarSkeleton";   

import { useAppContext } from "../GlobalContext"; 

function NavBar() { 

  const [showMenu, setShowMenu] = useState(false);

  const { cards, pathname, userData } = useAppContext();  

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMenu(false); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); 

  return (
    <div
      className={`shadow-lg shadow-gray-400 rounded-box backdrop-blur-sm
        fixed bottom-4 md:bottom-6 left-1/2 right-1/2 translate-x-[-50%] 
        w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]
        flex justify-evenly items-center h-16 border duration-300
        ${pathname == "/Dashboard" ? "hidden" : !userData._id ? " skeleton" : "  hover:bg-base-200/50 "}
      `}
    >
      {userData?._id && pathname != "/Dashboard" ? (
        <>   

          {/* home button */}
          <HomeButton pathname={pathname}/>

          {/* menu button */}
          <MenuButton setOpen={setShowMenu} open={showMenu} />

          {/* Menu */}  
          {userData?.email ? <Menu open={showMenu} cards={cards} pathname={pathname} setOpen={setShowMenu}/> : null} 

          {/* dashboard button */}
          <DashboardButton pathname={pathname}/> 
        </>)
        : 
        <NavBarSkeleton />
      }
    </div>
  );
}

export default NavBar;
