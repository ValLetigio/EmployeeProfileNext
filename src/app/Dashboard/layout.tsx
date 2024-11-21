 

import "../globals.css";
// import React from "react";

import BackButton from "./BackButton";

export default function RootLayout({ 
  children,  
}: Readonly<{ 
  children: React.ReactNode;  
}>) {
  // if (React.isValidElement(children)) {
  //   console.log(children.props);
  // }
  return ( 
    <main className="font-sans">
      <BackButton/>
      {children}
    </main>
  );
}
