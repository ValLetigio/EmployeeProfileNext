import React from 'react'

import CreateMemoForm from './CreateMemoForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* CreateMemoForm container */}
      <div className={` form-container `} >
        <CreateMemoForm/>
      </div>


    </div>
  )
}

export default page
