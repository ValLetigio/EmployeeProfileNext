'use client'

import React from 'react'

import type { Employee } from '@/app/Schema';

import { useAppContext } from '../GlobalContext';

import Image from 'next/image';

interface EmployeeTableProps {
    employeeList: Employee[]; 
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({employeeList}) => {

    const { selectedEmployee, setSelectedEmployee } = useAppContext();

  return (
    <table className="table w-full table-pin-rows table-pin-cols">
        {/* head */} 
        <thead>
            <tr> 
            <th>Name</th>
            <th>Address</th>
            <th>Is Production Employee</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {employeeList.map((employee) => (
            <tr key={employee._id} 
                className={`${selectedEmployee?._id == employee?._id ? "bg-gray-700 text-white" : "hover:bg-gray-200"} `}
            > 
                <th className='bg-opacity-0 backdrop-blur-md'>
                    <div className="flex items-center gap-3">
                        <div className="avatar ">
                        <div className="mask mask-squircle h-12 w-12 ">
                            <Image 
                                src={employee?.photoOfPerson}
                                alt="Avatar Tailwind CSS Component" height={1} width={1}/>
                        </div>
                        </div>
                        <div>
                        <div className="font-bold">{employee?.name}</div>
                        <div className="text-sm opacity-80">{employee?.phoneNumber}</div>
                        </div>
                    </div>
                </th>
                <td>{employee.address}</td>
                <td><input className='checkbox' type="checkbox" checked={employee?.isProductionEmployee}/></td> 
                <td>
                <button 
                    className=' text-xs border md:tooltip tooltip-top py-1 px-2 rounded-full bg-gray-600 text-white'  
                    onClick={() => setSelectedEmployee(employee)}
                    data-tip={"View Employee"}
                >
                    Details
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        {/* foot */}
        <tfoot >
            <tr> 
            <th>Name</th>
            <th>Address</th>
            <th>Is Production Employee</th>
            <th></th>
            </tr>
        </tfoot>
    </table>
  )
}

export default EmployeeTable
