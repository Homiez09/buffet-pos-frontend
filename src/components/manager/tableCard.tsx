"use client";

import { BaseTableResponse } from "@/interfaces/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TableCard({ table, refetchAvailableTables }: { table: BaseTableResponse, refetchAvailableTables: () => void }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false); 

  const paymentHandler = (tableID: string) => {
    router.push(`/manager/all-payment/${tableID}`);
    refetchAvailableTables();
  };

  const endTime = new Date(table.entryAt);
  endTime.setHours(endTime.getHours() + 2);

  return (
    <div className="flex flex-row justify-between shadow-md p-5 rounded-lg">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xl">Table NO: {table.id}</div>
          <div className="text-grey">
            <p>เวลาเริ่มต้น : {table.entryAt.toLocaleTimeString()}</p>
            <p>เวลาสิ้นสุด : {endTime.toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div
            className="btn btn-success text-whereWhite"
            onClick={() => paymentHandler(table.id)}
          >
            Make Payment
          </div>
          <div
            className="btn btn-error text-whereWhite"
            onClick={() => setOpenDialog(true)}
          >
            Cancel
          </div>
        </div>
      </div>
      <div className="font-bold text-xl">
        Time remaining: <span className="text-primary">112</span> mins
      </div>
    </div>
  );
}
