import React from 'react'; 

import CreateEmployeeForm from './CreateEmployeeForm';

export const metadata = {
  title: '| Create Employee',
  description: 'Employee Creation Form',
} 

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateEmployeeForm container */}
      <div className={` form-container `} >
        <CreateEmployeeForm/>
      </div>


    </div>
  )
}

export default page
