import React from 'react'

import UpdateOffenseForm from './UpdateOffenseForm'

import { Offense } from '@/app/schemas/OffenseSchema';

import ServerRequests from '@/app/api/ServerRequests';

export const metadata = {
  title: '| Update Offense',
  description: 'Update Offense Form',
} 

const page = async () => {

  const serverRequests = new ServerRequests( ); 
  
  const res = await serverRequests.fetchOffenseList();

  const offenseList: Offense[] = res.data;  

  const remedialActions = [
    "Written Reprimand",
    "Verbal Reprimand",
    "Verbal And Written Reprimand",
    "1 Day Suspension",
    "3 Days Suspension",
    "5 Days Suspension",
    "7 Days Suspension",
    "15 Days Suspension",
    "30 Days Suspension",
    "3 Days Suspension And 7 Days Confiscation Of Phone Or Gadget",
    "7 Days Suspension And 15 Days Confiscation Of Phone Or Gadget",
    "15 Days Suspension And 30 Days Confiscation Of Phone Or Gadget",
    "15 Days Suspension Or Management Discretion",
    "Dismissal",
    "Dismissal based on the severity or consequences of the offense", 
    "Written Reprimand / Suspension / Dismissal",
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
