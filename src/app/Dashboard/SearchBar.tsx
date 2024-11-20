'use client'

import React from 'react'

import { Employee } from '@/app/schemas/EmployeeSchema';


interface SearchBarProps {
    employeeList: Employee[];
}


const SearchBar :React.FC<SearchBarProps> = ({employeeList}) => { 

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filteredObjects = employeeList.filter(obj => 
            Object.values(obj).some(value => 
                String(value).toLowerCase().includes(e.target.value.toLowerCase())
            )
        );

        console.log(filteredObjects);
    }

  return (
    <label className=" input input-bordered flex items-center gap-2 z-[-1] " >
        <input onMouseLeave={(e)=> (e.target as HTMLInputElement).blur()}
            onChange={(e)=>handleSearch(e)} type="text" id='search' autoComplete='off'
            className="grow w-16 focus:w-full placeholder:text-base h-full truncate" placeholder='Search' />
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
