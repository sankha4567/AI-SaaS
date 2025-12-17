import React from 'react'
import Navbar from '@/components/navbar';
const layout = async({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Navbar/>
      {children} 
    </div>
  )
}

export default layout
