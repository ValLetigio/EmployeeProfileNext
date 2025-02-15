import React, { FC } from "react";

import Link from "next/link";

interface HomeButtonProps {
  pathname: string;
}

const HomeButton: FC<HomeButtonProps> = ({pathname}) => {
  return (
    <Link href={"/"}
      className={` ${pathname == '/' ? "border-info bg-info text-white" : "border-gray-400 text-gray-400 hover:border-info hover:text-info"}
        tooltip tooltip-top 
        backdrop-blur-xl shadow-md shadow-gray-400
        p-3 border rounded-box
      `} data-tip="Home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    </Link>
  );
};

export default HomeButton;
