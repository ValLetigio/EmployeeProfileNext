
import React from 'react';

import UpdateEmployeeForm from './UpdateEmployeeForm';

import type { Employee } from '@/app/Schema';  

import ServerRequests from '@/app/api/ServerRequests';

const Page = async () => { 

  const serverRequests = new ServerRequests( ); 
  
  const res = await serverRequests.fetchEmployeeList();

  const employeeList: Employee[] = res.data; 

  return (
    <div className="w-screen h-screen flex items-center justify-center"> 
      <div className="form-container">
        <UpdateEmployeeForm employeeList={employeeList} />
      </div>
    </div>
  );
};

export default Page;
