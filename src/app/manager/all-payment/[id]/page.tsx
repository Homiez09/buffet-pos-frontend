"use client";

import { useGetAllUnpaidInvoices, useUpdateInvoice } from "@/api/manager/useInvoice";
import { useGetMenus } from "@/api/manager/useMenu";
import { useGetOrdersByStatus } from "@/api/manager/useOrder";
import { useGetTableById } from "@/api/manager/useTable";
import DateTimeDisplay from "@/components/manager/clock";
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import LoadingAnimation from "@/components/manager/loadingAnimation";
import { UpdateInvoiceStatusRequest } from "@/interfaces/invoice";
import { BaseMenuResponse } from "@/interfaces/menu";
import { OrderItemResponse, OrderStatus } from "@/interfaces/order";
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

interface HistoryDetailPageProps {
  params: {
    id: string;
  };
}

interface OrderItemWithMenu extends OrderItemResponse {
  menu: BaseMenuResponse;
}

export default function PaymentDetailPage({ params }: PaymentDetailPageProps) {

  const { id } = params;
  const [ openDialog, setOpenDialog ] = useState(false);
  const router = useRouter();
  const toaster = useToastHandler();
  const updataInvoice = useUpdateInvoice();
  const [selectedInvoice, setSelectedInvoice] = useState<UpdateInvoiceStatusRequest  | null>(null);


  const {data:unpaidInvoices =[], isLoading: loadingUnpaidInvoices } = useGetAllUnpaidInvoices();
  const invoiceCurrent = unpaidInvoices?.find((invoice) => invoice.tableId === id);

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

  const totalCount = orderItemsWithMenu.length;

  const confirmHandler = async () => {
    const invoice : UpdateInvoiceStatusRequest = {
      invoice_id : invoiceCurrent?.id || ""
    }
    if (invoice) {
      setSelectedInvoice(invoice);
      setOpenDialog(true); // Open the dialog after setting selected invoice
    }
  };

  function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <div className="font-bold text-xl items-center flex px-5 rounded-lg border-2 border-primary">
          <DateTimeDisplay/>
        </div>
      </div>
      <div className="flex flex-row justify-between h-fit items-center">
        <div>
          <span className="font-bold">Invoice ID:</span> {invoiceCurrent?.id}
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center">
              <MdTableBar className="mx-2 w-6 h-6" />:
            </div>
            <p>21</p>
          </div>
          <div className="flex flex-row items-center">Time :{table?.entryAt ? formatDate(table.entryAt.toDateString()) : "No date"}</div>
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
            <div>
                <div><span className="font-bold">people:</span> {invoiceCurrent?.peopleAmount}</div>
                <div><span className="font-bold">total cost:</span>{invoiceCurrent?.totalPrice} baht</div>
            </div>
            <div><span className="font-bold">total order:</span> {totalCount}</div>
        </div>
        <div className="flex flex-row gap-4 justify-between">
            <div className="w-full flex flex-row gap-4">
              <div className="btn w-5/12" onClick={() => router.push(
                "/manager/all-payment"
              )}>
                  Back to All Payments
              </div>
              <div className="btn btn-success w-5/12" onClick={() => {
                confirmHandler();
                setOpenDialog(true);
              }}>
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
          callback={async () => {    
            if (selectedInvoice) { // Check if selectedInvoice is not null
              await updataInvoice.mutateAsync(selectedInvoice);
              toaster("ลูกค้าชำระเงินสำเร็จ", "ข้อมูลออเดอร์จะถูกจัดเก็บในประวัติออเดอร์");
              router.push("/manager/all-payment");
            } else {
              // Handle the case where selectedInvoice is null if necessary
              console.error("Selected invoice is null");
            }
          }}
        />
    </div>
  );
}
