
import React, { FC } from 'react';

import Link from 'next/link';
 
import { CardsSchema, CardSchema } from '../Schema';

interface MenuButtonProps {
  open: boolean; 
  cards: CardsSchema;
  pathname: string;
  setOpen: (open: boolean) => void;
} 

const Menu: FC<MenuButtonProps> = ({ open, cards, pathname, setOpen }) => { 

  return (
    <div 
      className={` ${!open? "scale-0 hidden" : "scale-100"}  
        fixed bottom-32 gap-4
        flex flex-wrap justify-center item-center 
        w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw] 
      `}
    >
      {Object.keys(cards).map((key : string) => {
        return (
          cards[key].map((card: CardSchema, index: number) =>  {
            const isActive = pathname.startsWith(card.path)
            return (
              <div className='h-14 w-14 md:h-16 md:w-16 text-xl ' key={`${key} ${index}`} id={card.id}>
                <Link href={card.path}
                  className={` tooltip tooltip-top 
                    ${isActive? 'border-blue-500 bg-blue-500 text-white' 
                      : 'border-gray-400 bg-white/85 text-gray-400 hover:border-blue-500 hover:text-blue-500 '
                    } 
                    w-full h-full border rounded-full shadow-md shadow-gray-400
                    flex items-center justify-center 
                  `} data-tip={card.title}
                  onClick={()=>setOpen(false)}
                >
                  {card.icon}
                </Link>
              </div> 
            )
          })
        )
      })}  
    </div>
  )
}

export default Menu
