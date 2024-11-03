'use client';

import { BaseTableResponse } from '@/interfaces/table'
import useToastHandler from '@/lib/toastHanlder';
import React, { useState } from 'react'
import { ConfirmDialog } from './manager/confirmDialog';
import ModifyTableNameDialog from './manager/ModifyTableNameDialog';
import { useDeleteTableById as useDeleteTable } from '@/api/manager/useTable';

interface TableNameCardProps {
  detail: BaseTableResponse; 
  refetchTables: () => void;
}



const TableNameCard: React.FC<TableNameCardProps> = ({ detail ,refetchTables}) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [openModifyTableNameDialog, setOpenModifyTableNameDialog] = useState(false);
  const toaster = useToastHandler();
  const deleteTable = useDeleteTable();


  return (
    <div className='p-4 mb-5 flex rounded-2xl items-center bg-white text-xl shadow-md justify-between'>
      <p className='text-2xl'>ชื่อโต๊ะ: {detail.tableName}</p>
      <div className='flex justify-between'>

        <button className='btn bg-grey text-whereWhite text-xl w-24 ' onClick={() => setOpenModifyTableNameDialog(true)}>แก้ไข</button>
        <button className='btn btn-error text-whereWhite text-xl w-24 ml-3' onClick={() => setOpenDialog(true)}>ลบ</button>
      </div>
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} title={'ลบโต๊ะ?'} description={'แน่ใจหรือไม่ว่าต้องการลบโต๊ะนี้'} callback={async () => {
        await deleteTable.mutateAsync(detail.id);
        toaster('ลบโต๊ะสำเร็จ', 'โต๊ะถูกลบเรียบร้อยแล้ว')
        refetchTables();
      }} />
      <ModifyTableNameDialog openDialog={openModifyTableNameDialog} setOpenDialog={setOpenModifyTableNameDialog} callback={() => {}} tableName={detail.tableName}/>
      
    </div>
  )
}

export default TableNameCard;