"use client";

import { useGetMenus } from "@/api/manager/useMenu";
import { useGetOrdersByStatus } from "@/api/manager/useOrder";
import { useGetTableById } from "@/api/manager/useTable";
import DateTimeDisplay from "@/components/manager/clock";
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import LoadingAnimation from "@/components/manager/loadingAnimation";
import { BaseMenuResponse } from "@/interfaces/menu";
import { OrderItemResponse, OrderResponse, OrderStatus } from "@/interfaces/order";
import useToastHandler from "@/lib/toastHanlder";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdTableBar } from "react-icons/md";
import { PiPrinterFill } from "react-icons/pi";

interface HistoryDetailPageProps {
  params: {
    id: string;
  };
}

interface OrderItemWithMenu extends OrderItemResponse {
  menu: BaseMenuResponse;
}

export default function HistoryDetailPage({ params }: HistoryDetailPageProps) {

  const { id } = params;
  const [ openDialog, setOpenDialog ] = useState(false);
  const router = useRouter();
  const toaster = useToastHandler();

  const { data: servedOrders, isLoading: loadingServedOrders } = useGetOrdersByStatus(OrderStatus.Served);
  const { data: menus, isLoading: loadingMenus } = useGetMenus();

  const orderData = servedOrders?.find((order) => order.id === id);
  const { data: table, isLoading: loadingTable } = useGetTableById(orderData?.tableId!);

  if (loadingServedOrders || loadingMenus || loadingTable) {
    return <LoadingAnimation />;
  }
  
  const orderItemsWithMenu: OrderItemWithMenu[] = orderData?.orderItem.map((item) => {
    const menu = menus?.find((menu) => menu.id === item.menuID);
    return { ...item, menu: menu! };
  })!;

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
          <DateTimeDisplay/>
        </div>
      </div>
      <div className="flex flex-row justify-between h-fit items-center">
        <div>
          <span className="font-bold">Order ID:</span> {orderData?.id}
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center">
              <MdTableBar className="mx-2 w-6 h-6" />:
            </div>
            <p>{table?.tableName}</p>
          </div>
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
            orderItemsWithMenu.map((oim, i) => {
                return (
                    <div key={i} className="grid grid-cols-2 w-full border-b-2 py-5 text-center">
                      <div className="font-bold items-center">{oim.menu.name}</div>
                      <div>{oim.quantity}</div>
                    </div>
                );
            })
          }
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div><span className="font-bold">total order:</span> {orderData?.orderItem.length} items</div>
        </div>
        <div className="flex flex-row gap-4 justify-between">
            <div className="w-full flex flex-row gap-4">
              <div className="btn w-5/12" onClick={() => router.push(
                "/manager/history"
              )}>
                  Back to Order History
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
