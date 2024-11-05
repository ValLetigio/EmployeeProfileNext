import React, { FC } from 'react';

interface MenuButtonProps {
  open: boolean;
  setOpen: (showMenu: boolean) => void;
}

const MenuButton: FC<MenuButtonProps> = ({ setOpen, open }) => {
  return (
    <button
      className={`${
        open
          ? "-translate-y-[50%] border-blue-500 text-blue-500"
          : " md:tooltip border-gray-700 text-white hover:text-blue-500"
      } p-5 border-4 rounded-full duration-300 tooltip-top shadow-md shadow-gray-400 bg-gray-700 `}
      id='menu-button'
      onClick={() => setOpen(!open)}  data-tip="Menu"
    >
      <svg
        className="h-6 w-6" 
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  );
};

export default MenuButton;
