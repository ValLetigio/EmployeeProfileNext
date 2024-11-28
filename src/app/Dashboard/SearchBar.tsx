'use client'

import React from 'react'

import { useAppContext } from '../GlobalContext'

import { useSearchParams } from 'next/navigation'


// interface SearchBarProps {
    
// } 

// const SearchBar :React.FC<SearchBarProps> = ({}) => {  
const SearchBar = ( ) => {  

    const { router, pathname, setLoading } = useAppContext(); 

    const [debounceTimeout, setDebounceTimeout] = React.useState<NodeJS.Timeout | null>(null);

    const searchParams = useSearchParams()

    const search = searchParams.get('search')  

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        
        const timeout = setTimeout(() => {
            const search = e.target.value?.toString();
            const url = new URL(pathname, window.location.origin);
            if(search){
                url.searchParams.set("search", search);
                router.push(url.toString());
            }else{
                url.searchParams.delete("search");
                router.push(url.toString());
            }

            setLoading(false);
        }, 1000);  

        setDebounceTimeout(timeout);
    }

  return (
    <label className=" input input-bordered flex items-center gap-2 " >
        <input 
            // onMouseLeave={(e)=> (e.target as HTMLInputElement).blur()} 
            onChange={(e)=>handleSearch(e)} 
            type="search" id='search' autoComplete='off' 
            className="grow w-20 hover:w-full focus:w-full placeholder:text-base h-full truncate " 
            placeholder='Search' defaultValue={search||""} />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70">
            <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
        </svg>
    </label>
  )
}

export default SearchBar
