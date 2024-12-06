import Breadcrumbs from "../NavigationComponents/Breadcrumbs";

export default function OffenseLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) { 

  return (
    <>
      <Breadcrumbs fixed={true} position={{x: "left-4 md:left-6", y: "top-2 md:top-4"}}/>
      {children}
    </>
  );
}
