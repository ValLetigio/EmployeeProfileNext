import React from 'react'

import DeleteEmployeeForm from './DeleteEmployeeForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateEmployeeForm container */}
      <div className={` form-container `} >
        <DeleteEmployeeForm/>
      </div>


    </div>
  )
}

export default page
