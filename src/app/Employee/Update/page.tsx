// app/employee/update/page.tsx
import React from 'react';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import type { Employee } from '@/app/Schema';

const Page = async () => {
  const data = {
    collection: 'Employee',
  };
  
  const res = await fetch('http://127.0.0.1:5000/readAllDataInCollection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store', // Ensures fresh data on every request
  }); 

  const { data: employeeList }: { data: Employee[] } = await res.json();

  return (
    <div className="w-screen h-screen flex items-center justify-center"> 
      <div className="form-container">
        <UpdateEmployeeForm employeeList={employeeList} />
      </div>
    </div>
  );
};

export default Page;
