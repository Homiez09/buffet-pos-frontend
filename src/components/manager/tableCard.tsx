"use client";

import { BaseTableResponse } from "@/interfaces/table";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

export default function TableCard({ table, refetchUnpaidInvoices }: { table: BaseTableResponse, refetchUnpaidInvoices: () => void }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false); 
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const paymentHandler = (tableID: string) => {
    router.push(`/manager/all-payment/${tableID}`);
    refetchUnpaidInvoices();
  };

  const endTime = new Date(table.entryAt);
  endTime.setHours(endTime.getHours() + 2);

  useEffect(() => {
    // Calculate remaining time in minutes
    const calculateTimeRemaining = () => {
      const now = new Date();
      const remainingTimeInMs = endTime.getTime() - now.getTime();
      const remainingTimeInMinutes = Math.max(Math.floor(remainingTimeInMs / 60000), 0);
      setTimeRemaining(remainingTimeInMinutes);
    };

    calculateTimeRemaining(); // Calculate initially

    // Optionally, update remaining time every minute
    const timer = setInterval(calculateTimeRemaining, 60000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [endTime]);

  return (
    <div className="flex flex-row justify-between shadow-md p-5 rounded-lg">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xl">Table NO: {table.tableName}</div>
          <div className="text-grey">
            <p>เวลาเริ่มต้น : {new Date(table.entryAt).toLocaleTimeString()}</p>
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
        Time remaining: <span className="text-primary">{timeRemaining}</span> mins
      </div>
    </div>
  );
}
