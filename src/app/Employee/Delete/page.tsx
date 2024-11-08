import React from 'react'

import DeleteEmployeeForm from './DeleteEmployeeForm'

import type { Employee } from '@/app/Schema';  

import ServerRequests from '@/app/api/ServerRequests';

const page = async () => {

  const serverRequests = new ServerRequests( ); 
  
  const res = await serverRequests.fetchEmployeeList();

  const employeeList: Employee[] = res.data;

  return (
    <div className='w-screen h-screen flex items-center justify-center '>  
      <div className={` form-container `} >
        <DeleteEmployeeForm employeeList={employeeList}/>
      </div> 
    </div>
  )
}

export default page
