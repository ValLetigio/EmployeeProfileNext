import React from 'react'

import UpdateOffenseForm from './UpdateOffenseForm'

import { Offense } from '@/app/schemas/OffenseSchema';

import ServerRequests from '@/app/api/ServerRequests';

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
      {/* UpdateOffenseForm container */}
      <div className={` form-container `} >
        <UpdateOffenseForm offenseList={offenseList} remedialActions={remedialActions}/>
      </div>


    </div>
  )
}

export default page
