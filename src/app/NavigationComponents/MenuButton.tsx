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
          ? "-translate-y-[50%] bg-blue-500 text-white "
          : "bg-gray-100 text-gray-400 md:hover:bg-blue-300 md:hover:text-white md:tooltip"
      } p-5 border-4 rounded-full duration-300 tooltip-top `}
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
