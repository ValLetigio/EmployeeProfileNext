
import React from 'react'

import CreateMemoForm from './CreateMemoForm'

// import type { Offense } from '@/app/Schema';  
import { Offense } from '@/app/schemas/OffenseSchema.ts';
import { Employee } from '../../schemas/EmployeeSchema.ts'
import ServerRequests from '@/app/api/ServerRequests';

const page = async () => { 

  const serverRequests = new ServerRequests( ); 
  
  const employeeRes = await serverRequests.fetchEmployeeList();

  const offenseRes = await serverRequests.fetchOffenseList();

  const employeeList: Employee[] = employeeRes.data; 
  const offenseList: Offense[] = offenseRes.data;

  return (
    <div className='w-screen h-screen flex items-center justify-center '>  
      <div className={` form-container `} >
        <CreateMemoForm employeeList={employeeList} offenseList={offenseList}/>
      </div> 
    </div>
  )
}

export default page
