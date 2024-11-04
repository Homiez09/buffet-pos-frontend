import { OrderResponse } from "@/interfaces/order";
import MenuCompleteCardList from "./MenuCompleteCardList";
import { formatDate } from "@/lib/formatDate";


export default function OrderedItems({ item }: { item: OrderResponse }) {
    return (
        <div className="border-b-2 mx-auto pb-2 w-11/12">
            <p className="text-lg ml-6 font-bold"> เวลา : {formatDate(item.createdAt.toString())} </p>
            <div className="p-3 ">
                <MenuCompleteCardList item={item.orderItem} status={item.status} />
            </div>
        </div>
    );
}