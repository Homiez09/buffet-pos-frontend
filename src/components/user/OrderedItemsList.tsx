'use client';

import { useCart } from "@/provider/CartProvider";
import LoadingAnimation from "../manager/loadingAnimation";
import OrderedItems from "./OrderedItems";
import { useGetOrder } from "@/api/user/useOrder";
import { OrderResponse } from "@/interfaces/order";

export default function OrderedItemsList() {
    const { accessCode } = useCart();

    const { data: orders, isLoading: isOrderLoading } = useGetOrder(accessCode);

    if (isOrderLoading) return <LoadingAnimation />;

    const sortedOrders = [...orders].sort((a: OrderResponse, b: OrderResponse) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return (
        <div className="flex flex-col gap-2" >
            {sortedOrders.map((item: OrderResponse, index: number) => <OrderedItems key={index} item={item} />)}
        </div>
    );
}