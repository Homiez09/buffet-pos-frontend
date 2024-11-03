import React from 'react'
import Setting from '@/app/manager/setting/page'
import Navbar from '@/components/Navbar'

const Page = () => {
  return (
    <div className="flex h-screen">
      
        <Navbar />
      
      <div className="flex-1">
        <Setting />
      </div>
    </div>
  )
}

export default Page
