
import React from 'react'; 

import type { Employee } from '@/app/Schema';  

import ServerRequests from '@/app/api/ServerRequests';

import EmployeeTable from './EmployeeTable';
import EmployeeDetails from './EmployeeDetails';  

const Page = async () => { 

  const serverRequests = new ServerRequests( );  
  const res = await serverRequests.fetchEmployeeList(); 
  const employeeList: Employee[] = res.data;  

  const employeeListLength = employeeList.length; 
  const productionEmployeeCount = employeeList.filter((employee) => employee.isProductionEmployee).length; 
  const newlyJoinedEmployeeCount = employeeList.filter((employee) => {
    const daysSinceJoined = (new Date().getTime() - new Date(employee.dateJoined).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceJoined <= 2;
  }).length; 

  const cardStyle = `h-[25%] lg:h-[20%] first:w-full lg:first:w-[30%] w-full sm:w-[48%] lg:w-[30%] 
    overflow-y-auto line-clamp-1 hover:bg-gray-700 hover:text-white hover:border-transparent
    p-4 shadow-md shadow-gray-500 rounded-xl flex flex-col items-start justify-evenly gap-4 border truncate tracking-tighter`;
  

  return (
    <div className=" flex flex-col items-center justify-start">  
      <div className=' w-full h-[10vh] scale-0'> </div>

      <div 
        className=" md:h-[90vh] overflow-auto w-[99vw] lg:w-[97vw] justify-between flex flex-wrap "
      > 
        <div className=' h-12 w-[45%] lg:w-[85%] flex items-center pl-4 '><h1 className='text-2xl font-semibold tracking-wider'>Dashboard</h1></div>

        {/* Register Button */}
        <div className=' h-12 w-[45%] lg:w-[10%] flex items-center justify-end mr-2 '>
          <button className='h-12 w-12 text-xl border tooltip tooltip-left
            bg-gray-100 hover:border-gray-700  hover:text-black
            shadow-sm shadow-gray-600 p-4 rounded-full flex items-center justify-center ' data-tip={"Register Employee"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg> 
          </button>
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
            <h3 className='text-lg font-semibold '>New</h3>
            <p className='text-4xl font-bold'>{newlyJoinedEmployeeCount}</p>
            <span className='opacity-80 text-sm'>Employee</span>
          </div>

          {/* Table */}
          <div className='w-[100%] max-h-[85vh] lg:h-[75%] p-4 shadow-md shadow-gray-500 rounded-xl flex flex-col items-start justify-between border '>
            <div className=" w-full overflow-auto h-full">
              <h2 className='text-xl font-semibold tracking-tighter sticky left-0 top-0 mb-2'>Employees</h2>
              <EmployeeTable employeeList={employeeList} />
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
