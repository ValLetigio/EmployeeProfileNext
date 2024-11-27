import React from 'react'

const loading = () => {
  return (
    <span 
      className="
        fixed top-1/2 bottom-1/2 left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] 
        loading loading-spinner loading-lg text-info -z-50 inset-0
      "
    />
  )
}

export default loading
