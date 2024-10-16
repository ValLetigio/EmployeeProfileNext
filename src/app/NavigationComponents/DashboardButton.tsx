import React, { FC } from "react";

import Link from "next/link";

interface DashboardButtonProps {
  pathname: string;
}

const DashboardButton: FC<DashboardButtonProps> = ({pathname}) => {
  return (
    <Link href={"/Dashboard"}
      className={` ${pathname == '/Dashboard' ? "bg-blue-500 text-white" : "border-gray-400 text-gray-400  hover:border-blue-500 hover:text-blue-500"}
        tooltip tooltip-top 
        backdrop-blur-xl shadow-md shadow-gray-400
        p-3 border rounded-full
      `} data-tip="Dashboard"
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
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    </Link>
  );
};

export default DashboardButton;
