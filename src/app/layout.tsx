'use client'

import { SessionProvider } from "next-auth/react"; 

import { Session } from "next-auth";  

import "./globals.css";
import { Poppins } from "next/font/google";

import NavBar from "./NavigationComponents/NavBar"; 
import ContextProvider from "./GlobalContext/index"; 

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
}); 

export default function RootLayout({
  children,
  session, 
}: Readonly<{
  children: React.ReactNode;
  session: Session; 
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.variable} overflow-x-clip antialiased`}>
        <SessionProvider session={session}> 
          <ContextProvider>
            {children} 
            <NavBar /> 
          </ContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
