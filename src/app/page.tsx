import React from 'react'
import MakePayment from '@/components/manager/MakePayment'
import Navbar from '@/components/Navbar'

const Page = () => {
  return (
    <div className="flex h-screen">
      
        <Navbar />
      
      <div className="flex-1">
        <MakePayment />
      </div>
    </div>
  )
}

export default Page
