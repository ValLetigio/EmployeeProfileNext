//server side rendering copy

import React from 'react';  

import { Employee } from '@/app/schemas/EmployeeSchema';

import { User } from '@/app/schemas/UserSchema';

import ServerRequests from '@/app/api/ServerRequests';

import EmployeeTable from './EmployeeTable';
import EmployeeDetails from './EmployeeDetails';   
import SearchBar from './SearchBar';

import BackButton from '../NavigationComponents/BackButton';

import { getUserData, getTestUserData } from '../api/UserData';

import Link from 'next/link';  

export const metadata = {
  title: '| Dashboard',
  description: 'Employee Dashboard',
} 
 
const Page = async () => {

  const isTest = process.env.NEXT_PUBLIC_CYPRESS_IS_TEST_ENV == "true" ? true : false;

  const serverRequests = new ServerRequests( );

  const userData: User = !isTest ?  await getUserData() : await getTestUserData();

  const employeeResponse = await serverRequests.getEmployeeForDashboardAction(userData);  
  
  let employeeList: Employee[] = [];

  let employeeListLength = 0;
  let productionEmployeeCount = 0;
  let newlyJoinedEmployeeCount = 0;
  let daysSinceJoined = 0;
  
  if(employeeResponse.data){
    employeeList = employeeResponse.data;  

    employeeListLength = employeeList?.length
    productionEmployeeCount = employeeList.filter((employee) => employee.isProductionEmployee)?.length; 
    newlyJoinedEmployeeCount = employeeList.filter((employee) => {
      daysSinceJoined = (new Date().getTime() - new Date(employee.dateJoined).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceJoined <= 30;
    })?.length; 
  }

  const cardStyle = `h-[25%] lg:h-[20%] first:w-full lg:first:w-[30%] w-full sm:w-[48%] lg:w-[30%] 
    overflow-y-auto hover:bg-base-300 hover:border-transparent
    pl-4 p-2 shadow-lg rounded-xl flex flex-col items-start justify-evenly gap-2 border tracking-tighter`;
  

  return (
    <div className=" flex flex-col items-center justify-center h-max md:h-[100vh] ">  
      <BackButton/>
      <div className=' w-full h-[10vh] md:h-[5vh] scale-0'> </div>

      <div 
        className=" md:h-[90vh] overflow-auto w-[99vw] lg:w-[97vw] justify-between flex flex-wrap "
      > 
        <div className=' h-12 w-[45%] lg:w-[85%] flex items-center pl-4 '><h1 className='text-2xl font-semibold tracking-wider'>Dashboard</h1></div>

        {/* employee Button */}
        <div className=' h-12 w-[45%] lg:w-[10%] flex items-center justify-end mr-2 '>
          <Link className='h-12 w-12 text-xl border tooltip tooltip-left
            bg-base-200 hover:border-info hover:text-info
            shadow-sm shadow-gray-600 p-0 rounded-full flex items-center justify-center ' data-tip={"Create/Update/Delete an Employee"} href={"/Employee"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg> 
          </Link>
        </div>

        {/* cards and table */}
        <div className='w-full lg:w-[65%] h-max lg:h-[92%] flex flex-wrap items-center justify-between p-4 gap-4 lg:gap-0 ' >
          {/* Employee Length */}
          <div className={cardStyle}>
            <h3 className='text-lg font-semibold '>Employees</h3>
            <p className='text-4xl font-bold'>{employeeListLength}</p>
            <span className='opacity-80 text-sm'>Total Employee</span>
          </div>

          {/* Production Employee Count */}
          <div className={cardStyle}>
            <h3 className='text-lg font-semibold '>Production</h3>
            <p className='text-4xl font-bold'>{productionEmployeeCount}</p>
            <span className='opacity-80 text-sm'>Employee</span>
          </div>

          {/*  Newly Joined Employee Count */}
          <div className={cardStyle}>
            <h3 className='text-lg font-semibold '>New (30 Days)</h3>
            <p className='text-4xl font-bold'>{newlyJoinedEmployeeCount}</p>
            <span className='opacity-80 text-sm'>Employee</span>
          </div>

          {/* Table */}
          <div className='w-[100%] max-h-[95vh] lg:h-[75%] p-4 shadow-lg rounded-xl flex flex-col items-start justify-between border '>
            <div className=" w-full overflow-auto h-full">
              <div className='flex flex-col md:flex-row p-1 justify-between items-center w-full'>
                <h2 className='text-xl font-semibold tracking-tighter text-start sticky left-0 top-0 mb-2 w-full'>Employees</h2>
                <SearchBar/>
              </div> 

              <EmployeeTable
                employeeList={employeeList} 
              />
            </div>
          </div>  
        </div>

        {/* employee preview */}
        <div className='w-full lg:w-[35%] max-h-[95vh] lg:h-[92%] flex flex-wrap justify-between py-6 px-4'>
          <EmployeeDetails />
        </div>
 
         
      </div> 
    </div>
  );
};

export default Page;
