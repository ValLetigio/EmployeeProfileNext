
import Link from 'next/link';
import React, { FC } from 'react';

interface MenuButtonProps {
  open: boolean; 
  cards: cards;
}   

interface card {
  path: string;
  icon: React.ReactNode;
  roles: string[];
  description: string;
  title: string;
}
 
interface cards {
  [key: string]: card[];
}

const Menu: FC<MenuButtonProps> = ({ open, cards }) => { 

  return (
    <div 
      className={` ${open? "scale-100" : "scale-0"} 
        fixed bottom-32 gap-4
        flex flex-wrap justify-center item-center 
        w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw] 
      `}
    >
      {Object.keys(cards).map((key) => {
        return (
          cards[key].map((card) =>  
            <div className='h-14 w-14 md:h-16 md:w-16 text-xl '>
              <Link href={card.path}
                className={` tooltip tooltip-top
                  text-gray-400 hover:border-blue-500 hover:text-blue-500 bg-white/85 
                  w-full h-full border rounded-full shadow-md shadow-gray-400
                  flex items-center justify-center 
                `} data-tip={card.title}
              >
                {card.icon}
              </Link>
            </div> 
          )
        )
      })} 
      
    </div>
  )
}

export default Menu
