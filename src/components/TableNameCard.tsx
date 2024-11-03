import { BaseTableResponse } from '@/interfaces/table'
import React from 'react'


interface TableNameCardProps {
  detail: BaseTableResponse; // Define the expected prop
}

const TableNameCard: React.FC<TableNameCardProps>  = ({detail}) => {
  return (
    <div className='p-4 mb-5 flex rounded-2xl items-center bg-whereWhite text-xl shadow-md justify-between'>
      <p className='text-2xl'>ชื่อโต๊ะ: {detail.tableName}</p>
      <div className='flex justify-between'> 
        <button className='btn bg-grey text-whereWhite text-xl w-24 '>แก้ไข</button>
        <button className='btn bg-error text-whereWhite text-xl w-24 ml-3'>ลบ</button>
      </div>
    </div>
  )
}

export default TableNameCard