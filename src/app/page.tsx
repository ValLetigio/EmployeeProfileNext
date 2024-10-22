
import "./globals.css";

export const metadata = {
  title: '| Home',
  description: 'Page Description',
}

export default function Home() {  

  return (
    <>
      <div 
        className={` h-screen w-full flex items-center justify-center `} > 
        <p className=" tooltip tooltip-top " data-tip="Home">Home</p>
      </div> 
      <div 
        className={` h-screen w-full flex items-center justify-center  `} > 
        <p className=" tooltip tooltip-top " data-tip="Home Home Home Home Home Home Home">Home Home Home Home Home Home Home</p>
      </div> 
    </>
  );
}
