'use client'

import React from 'react' 

import { Employee } from '../schemas/EmployeeSchema';

import { useAppContext } from '../GlobalContext';

import Image from 'next/image';

interface EmployeeTableProps {
    employeeList: Employee[]; 
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({employeeList}) => {

    const { selectedEmployee, setSelectedEmployee } = useAppContext(); 

  return (
    <table className="table w-full table-pin-rows ">
        {/* head */} 
        <thead>
            <tr> 
                <th>Name</th>
                <th>Address</th>
                <th>Company</th> 
            </tr>
        </thead>
        <tbody>
            {employeeList.map((employee) => (
            <tr key={employee._id} 
                className={`${selectedEmployee?._id == employee?._id ? "bg-gray-700 text-white" : "hover:bg-gray-200"} `}
                onClick={() => setSelectedEmployee(employee)} data-tip={'View'}
            > 
                <th className='bg-opacity-0 backdrop-blur-md ' >
                    <div className="flex items-center gap-3">
                        <div className="avatar ">
                            <div className="mask mask-squircle h-12 w-12 ">
                                <Image 
                                    src={employee?.photoOfPerson}
                                    alt="Avatar Tailwind CSS Component" height={1} width={1}/>
                            </div>
                        </div>
                        <div className='text-start'>
                            <div className="font-bold">{employee?.name}</div>
                            <div className="text-sm opacity-80">{employee?.phoneNumber}</div>
                        </div>
                    </div>
                </th>
                <td>{employee.address}</td>
                <td>{employee?.company}</td>  
            </tr>
            ))}
        </tbody>
        {/* foot */}
        <tfoot >
            <tr> 
                <th>Name</th>
                <th>Address</th>
                <th>Company</th> 
            </tr>
        </tfoot>
    </table>
  )
}

export default EmployeeTable
