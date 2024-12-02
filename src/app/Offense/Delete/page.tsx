import React from 'react'

import DeleteOffenseForm from './DeleteOffenseForm'

import { Offense } from '@/app/schemas/OffenseSchema';

import ServerRequests from '@/app/api/ServerRequests';

export const metadata = {
  title: '| Delete Offense',
  description: 'Delete Offense Form',
} 

const page = async () => {

  const serverRequests = new ServerRequests( ); 
  
  const res = await serverRequests.fetchOffenseList();

  const offenseList: Offense[] = res.data;  

  const remedialActions = [
    "Verbal Warning",
    "Written Warning",
    "Counseling or Training",
    "Performance Improvement Plan (PIP)",
    "Suspension",
    "Probation",
    "Mediation or Conflict Resolution",
    "Final Written Warning",
    "Termination of Employment"
  ];

  return (
    <div className='w-screen h-screen flex items-center justify-center '>  
      <div className={` form-container `} >
        <DeleteOffenseForm offenseList={offenseList} remedialActions={remedialActions}/>
      </div> 
    </div>
  )
}

export default page
