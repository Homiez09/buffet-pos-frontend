'use client'

import 
{ useGetPricePerGram } from "@/api/manager/useSetting";
import { BaseInvoiceResponse } from "@/interfaces/invoice";
import { useRouter } from "next/navigation";


export default function HistoryCard({invoice}: {invoice: BaseInvoiceResponse}) {
    const {data: foodFee}
    = useGetPricePerGram();

    const router = useRouter();
    return(
        <div className="rounded-lg bg-white p-7 flex flex-col gap-1">
            <h1 className="font-bold text-xl"> รหัสรายการชำระเงิน : {invoice.tableId}</h1>
            <h2 className=" text-lg"><span className="font-bold">จำนวนคน :</span> {invoice.peopleAmount} คน</h2>
            <h2 className=" text-lg"><span className="font-bold">ราคาที่ชำระ : </span> {invoice.totalPrice} บาท <span>(<span className="font-bold">อาหารเหลือ:</span> {invoice.price_fee_food_overweight} บาท ({foodFee?.value} บาท/กรัม))</span></h2>
            <button className=" bg-primary rounded-md p-3 font-bold text-m text-white mt-4 shadow-md" onClick={() => router.push(`/manager/history/${invoice.id}`)}>ดูรายละเอียด</button>
        </div>
);
}