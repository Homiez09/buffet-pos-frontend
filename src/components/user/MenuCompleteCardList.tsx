import { OrderItemResponse } from "@/interfaces/order";
import MenuConfirmCard from "./MenuCompleteCard";
import { useEffect } from "react";

export default function MenuCompleteCardList({ item, status } : { item: OrderItemResponse[], status: string }) {
    useEffect(() => {
        console.log(status)
    }, [])
    return (
        <div className="flex flex-col gap-3" >
            {item.map((item: OrderItemResponse, index) => <MenuConfirmCard key={index} item={item} status={status} />)}
        </div>
    );
}