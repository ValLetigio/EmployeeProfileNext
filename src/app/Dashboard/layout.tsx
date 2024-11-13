 

import "../globals.css";   

import BackButton from "./BackButton";

export default function RootLayout({ 
  children,  
}: Readonly<{ 
  children: React.ReactNode;  
}>) {
  return ( 
    <main className="font-sans">
        <BackButton/>
        {children}
    </main>
  );
}
