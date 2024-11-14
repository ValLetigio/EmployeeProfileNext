'use client'; 

import { SessionProvider } from "next-auth/react";  

import "./globals.css"; 

import ContextProvider from "./GlobalContext/index"; 

import NavBar from "./NavigationComponents/NavBar"; 
import ProfileMenu from "./ProfileMenuComponents/ProfileMenu";
import Toast from "./toast";
import Confirmation from "./confirmation";

import ImageModal from "./Modals/ImageModal";

import { Poppins } from "next/font/google"; 

const poppins = Poppins({ 
  subsets: ["latin"], display: "swap", variable: "--font-poppins", 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
}); 

export default function RootLayout({ 
  children, 
  session, 
}: Readonly<{ 
  children: React.ReactNode; 
  session: never; 
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.variable} overflow-x-clip `}>
        <SessionProvider session={session}>
          <ContextProvider>
            <ProfileMenu/>
            {children} 
            <NavBar/>
            <ImageModal/>
            <Toast />
            <Confirmation />
          </ContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
