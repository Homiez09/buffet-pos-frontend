"use client";

import useToastHandler from "@/lib/toastHanlder";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import LoadingAnimation from "@/components/manager/loadingAnimation";
import { OrderResponse, OrderStatus, UpdateOrderRequest } from "@/interfaces/order";
import OrderCard from "@/components/manager/orderCard";
import { useGetOrdersByStatus ,useUpdateOrder} from "@/api/manager/useOrder";
import { useGetTableById, useGetTables } from "@/api/manager/useTable";

export default function OrderPage() {
  const toaster = useToastHandler();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tables, isLoading: loadingTables, refetch: refetchTables } = useGetTables();
  const {data: preparingOrders =[], isLoading: loadingPreparingOrders,refetch: refetchPreparingOrders } = useGetOrdersByStatus(OrderStatus.Preparing);
  const updateOrder = useUpdateOrder();

  if (loadingPreparingOrders || loadingTables) {
    return <LoadingAnimation/>
  }

  const filteredPreparingOrders = preparingOrders.filter((order) =>
    tables?.find((table) => table.id === order.tableId)?.tableName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateOrderHandler = (orderID :string) => {
    const orderData: UpdateOrderRequest = {
      status: OrderStatus.Served, // หรือสถานะที่คุณต้องการอัปเดต
      table_id: orderID // ใช้ tableId ของ order ที่ถูกเลือก
    };
    updateOrder.mutateAsync(orderData)
    setOpenDialog(true);
    refetchPreparingOrders();
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <label className="input input-bordered flex items-center gap-2 rounded-xl">
          <input type="text" className="grow" placeholder="Search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        {Array.isArray(filteredPreparingOrders) && filteredPreparingOrders.length > 0 ? (
          filteredPreparingOrders.map((order: OrderResponse) => (
            <div key={order.id} className="flex flex-col items-center gap-3">
              <div className="flex flex-row items-center w-full mt-10">
                <div className="w-full font-bold px-2">
                  <div>Table NO: {order.tableId}</div>
                  <div>Order Since: {order.createdAt.toString()}</div>
                </div>
                <div
                  className="btn btn-success text-white font-bold text-lg"
                  onClick={() => updateOrderHandler(order.id)}
                >
                  Deliver
                </div>
              </div>
              <div 
                className="w-[54rem] text-whereBlack overflow-x-scroll border-2 rounded-lg"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
              >
                <div className="flex flex-row gap-1" style={{ width: "max-content" }}>
                  {order.orderItem?.map((item) => (
                    <OrderCard key={item.id} orderItem={item} />
                  ))}
                </div>
              </div>
            </div>
          ))
          ) : (
            <p>No orders now</p>
          )
        }
      </div>
      <ConfirmDialog openDialog={openDialog} setOpenDialog={setOpenDialog} title="ยืนยันการจัดส่งอาหาร?" description="แน่ใจหรือไม่ว่าต้องการจัดส่งอาหาร" callback={() =>{ 
            toaster("ส่งออเดอร์สำเร็จ", "คุณทำการส่งออเดอร์สำเร็จ");
            setOpenDialog(false);      
        }} />
    </div>
  );
}
