import React from 'react'

import UpdateOffenseForm from './UpdateOffenseForm'

const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center '> 
      {/* UpdateOffenseForm container */}
      <div className={` form-container `} >
        <UpdateOffenseForm/>
      </div>


    </div>
  )
}

export default page
