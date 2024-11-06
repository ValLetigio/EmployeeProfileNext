import React from 'react'

import DeleteMemoForm from './DeleteMemoForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* DeleteMemoForm container */}
      <div className={` form-container `} >
        <DeleteMemoForm/>
      </div>


    </div>
  )
}

export default page
