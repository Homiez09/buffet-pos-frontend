"use client";

import MenuCard from "@/components/manager/menuCard";
import { useState } from "react";
import Image from "next/image";
import { DiVim } from "react-icons/di";
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import LoadingAnimation from "@/components/manager/loadingAnimation";
import { useGetOrders ,useDeliverOrder} from "@/api/manager/useOrder";

export default function OrderPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const {data: order =[], isLoading: loadingOrders, refetch: refetchOrders } = useGetOrders();
  const deliverOrder = useDeliverOrder();

  if (loadingOrders) {
    return <LoadingAnimation/>
  }

  const addMenuHandler = () => {
    setOpenDialog(true);
  };

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
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center w-full mt-10">
                <div className="w-full font-bold px-2">
                    <div>Table NO: 12</div>
                    <div>Order Since: 2 minutes ago</div>
                </div>
                <div
                    className="btn btn-success text-white font-bold text-lg"
                    onClick={addMenuHandler}
                    >
                    Deliver
                </div>
              </div>
              <div 
                className="w-[54rem] text-whereBlack overflow-x-scroll border-2 rounded-lg"
                style={{
                    scrollbarWidth: 'none',       // Firefox
                    msOverflowStyle: 'none',      // Internet Explorer 10+
                }}
              >
                <div
                  className="flex flex-row gap-1"
                  style={{ width: "max-content" }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => {
                      return <OrderCard key={i} />;
                    })}
                </div>
              </div>
            </div>
          ))}
      </div>
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} title="ยืนยันการจัดส่งอาหาร?" description="แน่ใจหรือไม่ว่าต้องการจัดส่งอาหาร" />
    </div>
  );
}

const OrderCard = () => {
  return (
    <div className="flex flex-col w-48 shadow-md m-2 p-2 rounded-lg gap-3">
      <div className="w-full">
        <Image
          src="/assets/images/sample-salmon.svg"
          alt="salmon"
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="w-full flex flex-col">
        <div>M1 แซลมอนรมควัน</div>
        <div>Type: ปลา</div>
      </div>
      <div className="w-full justify-end flex flex-row">x1</div>
    </div>
  );
};
