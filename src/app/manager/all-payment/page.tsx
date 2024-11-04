"use client";

import { ConfirmDialog } from "@/components/manager/confirmDialog";
import useToastHandler from "@/lib/toastHanlder";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetTables} from "@/api/manager/useTable";
import { BaseTableResponse} from "@/interfaces/table";
import TableCard from "@/components/manager/tableCard";
import LoadingAnimation from "@/components/manager/loadingAnimation";
import { useGetAllUnpaidInvoices } from "@/api/manager/useInvoice";


export default function AllPaymentPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const toaster = useToastHandler();
  const {data:unpaidInvoices =[], isLoading: loadingUnpaidInvoices,refetch: refetchUnpaidInvoices } = useGetAllUnpaidInvoices();
  const {data:getTables =[], isLoading: loadingAvailableTables,refetch: refetchAvailableTables } = useGetTables();

  const filteredTables = getTables.filter(table =>
    unpaidInvoices.some(invoice => invoice.tableId === table.id)
  );

  if (loadingUnpaidInvoices) {
    return <LoadingAnimation />;
  }
  return (
    
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <label className="input input-bordered flex items-center gap-2 rounded-xl">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="font-bold text-xl items-center flex px-5 rounded-lg border-2 border-primary">
          25 September 2024, 18:02:55
        </div>
      </div>
      <div>
        {Array.isArray(filteredTables) && filteredTables.length > 0 ? (
          filteredTables.map((table: BaseTableResponse) => (
            <div key={table.id} className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center w-full mt-10">
                <div className="w-full font-bold px-2">
                  <TableCard key={table.id} table={table} refetchUnpaidInvoices={refetchUnpaidInvoices} />
                </div>
              </div>
              <div 
                className="w-[54rem] text-whereBlack overflow-x-scroll border-2 rounded-lg"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
              >
              </div>
            </div>
          ))
          ) : (
            <p>No tables now</p>
          )
        }
      </div>
      <ConfirmDialog
        title="ยกเลิกโต๊ะ?"
        description="แน่ใจหรือไม่ว่าต้องการยกเลิกโต๊ะนี้"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        callback={() => {
          toaster("ยกเลิกโต๊ะสำเร็จ", "โต๊ะได้ถูกยกเลิกเรียบร้อยแล้ว");
        }}
      />
    </div>
  );

  
}
