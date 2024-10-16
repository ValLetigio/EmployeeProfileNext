import "./globals.css";

export const metadata = {
  title: '| Home',
  description: 'Page Description',
}

import { getServerSession } from "next-auth";
import { options } from "/api/auth/[...nextauth]/options";
  const session = await getServerSession(options);


export default function Home() {
  const user = await getUserSession();

  return (
    <>
      <div className={` h-screen w-full flex items-center justify-center `} > 
        <p className=" tooltip tooltip-top " data-tip="Home">Home</p>
      </div> 
      <div className={` h-screen w-full flex items-center justify-center bg-gray-300 `} > 
        <p className=" tooltip tooltip-top " data-tip="Home Home Home Home Home Home Home">Home Home Home Home Home Home Home</p>
      </div> 
    </>
  );
}
