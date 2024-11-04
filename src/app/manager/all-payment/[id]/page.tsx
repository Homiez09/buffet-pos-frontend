"use client";

import { ConfirmDialog } from "@/components/manager/confirmDialog";
import useToastHandler from "@/lib/toastHanlder";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdTableBar } from "react-icons/md";
import { PiPrinterFill } from "react-icons/pi";

interface PaymentDetailPageProps {
  params: {
    id: string;
  };
}

export default function PaymentDetailPage({ params }: PaymentDetailPageProps) {

  const { id } = params;
  const [ openDialog, setOpenDialog ] = useState(false);
  const router = useRouter();
  const toaster = useToastHandler();

  

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
      <div className="flex flex-row justify-between h-fit items-center">
        <div>
          <span className="font-bold">Order ID:</span> {id}
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center">
              <MdTableBar className="mx-2 w-6 h-6" />:
            </div>
            <p>21</p>
          </div>
          <div className="flex flex-row items-center">Time : 21:00</div>
        </div>
      </div>
      <div className="collapse bg-primary w-full">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-bold grid grid-cols-2 text-center w-full">
          <div>Menu</div>
          <div>Quantity</div>
        </div>
        <div className="collapse-content bg-wherePrimary">
          {
            Array(10).fill(0).map((_, i) => {
                return (
                    <div key={i} className="grid grid-cols-2 w-full border-b-2 py-5 text-center">
                      <div className="font-bold items-center">carry plus egg</div>
                      <div>x1</div>
                    </div>
                );
            })
          }
        </div>
      </div>
      <div className="flex flex-row justify-between">
            <div>
                <div><span className="font-bold">people:</span> 5</div>
                <div><span className="font-bold">total cost:</span> 2000 baht</div>
            </div>
            <div><span className="font-bold">total order:</span> 23 items</div>
        </div>
        <div className="flex flex-row gap-4 justify-between">
            <div className="w-full flex flex-row gap-4">
              <div className="btn w-5/12" onClick={() => router.push(
                "/manager/all-payment"
              )}>
                  Back to All Payments
              </div>
              <div className="btn btn-success w-5/12" onClick={() => setOpenDialog(true)}>
                  Confirm Payment
              </div>
            </div>
            <div className="btn btn-primary w-fit" onClick={() => console.log("printing")}>
              <PiPrinterFill className="w-full h-full text-whereWhite" />
            </div>
        </div>
        <ConfirmDialog
          title="ยืนยันการชำระเงิน?"
          description="แน่ใจหรือไม่ว่าต้องการยืนยันการชำระเงิน"
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          callback={() => {
            router.push("/manager/all-payment");
            toaster("ลูกค้าชำระเงินสำเร็จ", "ข้อมูลออเดอร์จะถูกจัดเก็บในประวัติออเดอร์");
          }}
        />
    </div>
  );
}
