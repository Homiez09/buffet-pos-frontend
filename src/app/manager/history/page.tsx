"use client";

import { useGetOrdersByStatus } from "@/api/manager/useOrder";
import { useGetTables } from "@/api/manager/useTable";
import DateTimeDisplay from "@/components/manager/clock";
import { OrderResponse, OrderStatus } from "@/interfaces/order";
import { BaseTableResponse } from "@/interfaces/table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface ServedOrderWithTable extends OrderResponse {
  table?: BaseTableResponse;
}

export default function HistoryPage() {
  const router = useRouter();

  const {
    data: tables = [],
    isLoading: loadingTables,
    isError: errorTables,
  } = useGetTables();
  const {
    data: servedOrders = [],
    isLoading: loadingServedOrders,
    isError: errorServedOrders,
  } = useGetOrdersByStatus(OrderStatus.Served);

  const servedOrdersWithTable: ServedOrderWithTable[] = useMemo(
    () =>
      servedOrders.map((order) => {
        const table = tables.find((table) => table.id === order.tableId);
        return { ...order, table }; // table may be undefined if not found
      }),
    [servedOrders, tables]
  );

  if (loadingTables || loadingServedOrders) {
    return <div>Loading...</div>;
  }

  if (errorTables || errorServedOrders) {
    return <div>Error loading data. Please try again later.</div>;
  }

  interface TableCardProps {
    table?: BaseTableResponse;
    sot: ServedOrderWithTable;
  }

  const TableCard = ({ table, sot }: TableCardProps) => {
    if (!table) {
      return <div className="text-red-500">Table information unavailable.</div>;
    }
  
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
      <div className="flex flex-row justify-between shadow-md p-5 rounded-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="font-bold text-xl">Table NO: {table.tableName}</div>
            <div className="text-grey">{formatDate(sot.createdAt)}</div>
          </div>
          <div className="flex flex-row gap-2">
            {sot.id ? (
              <div
                className="btn btn-info text-whereWhite"
                onClick={() => router.push(`/manager/history/${sot.id}`)}
              >
                View Order
              </div>
            ) : (
              <div className="text-red-500">Order ID unavailable.</div>
            )}
          </div>
        </div>
      </div>
    );
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
      </div>
      <div className="gap-5 flex flex-col">
        {servedOrdersWithTable.length > 0 ? (
          servedOrdersWithTable.map((sot) => (
            <TableCard key={sot.id} table={sot.table} sot={sot} />
          ))
        ) : (
          <div>No served orders found.</div>
        )}
      </div>
    </div>
  );
}
