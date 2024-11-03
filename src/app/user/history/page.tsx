import MenuConfirmCard from "@/components/user/MenuConfirmCard";
import MenuConfirmCardList from "@/components/user/MenuConfirmCardList";
import OrderedItems from "@/components/user/OrderedItems";
import OrderItemsList from "@/components/user/OrderedItems";
import OrderedItemsList from "@/components/user/OrderedItemsList";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function History() {
    return (
        <div className="flex flex-col">
            <div className="pl-3 pt-6 pb-1">
                <Icon icon="weui:back-filled" fontSize={40} />
                <p className="text-xl font-bold pt-3 mb-3  border-b border-b-whereBlack pb-2 w-11/12 mx-auto "> รายการอาหารที่สั่งแล้ว</p>
            </div>
            <OrderedItemsList />
            <button className="bg-primary text-white font-bold text-xl py-3 px-5  mt-5 rounded-lg w-10/12 pb-4 shadow-lg self-center">
                สั่งอาหารเพิ่ม
            </button>
            <div className="pl-3 pt-6">
            <div className="flex flex-row justify-between pt-1 pb-7 w-11/12 mx-auto">
            <p className="text-xl font-bold "> ยอดชำระเงิน :</p>
            <p className=" text-xl font-bold "> 100 บาท</p>
        </div>
            </div>
        </div>

    );
}