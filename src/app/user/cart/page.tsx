'use client';
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import ScreenMobile from "@/components/ScreenMobile";
import { ConfirmOrderDialog } from "@/components/user/ConfirmOrderDialog";
import MenuCardList from "@/components/user/MenuCardList";
import { BaseMenuResponse } from "@/interfaces/menu";
import { useCart } from "@/provider/CartProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
const menuList: BaseMenuResponse[] = [
    {
        id: "0",
        name: "Pork",
        description: "moo ouan",
        categoryId: "2",
        imageUrl: "222222222222",
        isAvailable: true
    },
    {
        id: "1",
        name: "Beef",
        description: "neua yang",
        categoryId: "1",
        imageUrl: "111111111111",
        isAvailable: true
    },
    {
        id: "2",
        name: "Chicken",
        description: "gai tod",
        categoryId: "3",
        imageUrl: "333333333333",
        isAvailable: false
    },
    {
        id: "3",
        name: "Shrimp",
        description: "goong pad",
        categoryId: "4",
        imageUrl: "444444444444",
        isAvailable: true
    },
    {
        id: "4",
        name: "Fish",
        description: "pla khao",
        categoryId: "5",
        imageUrl: "555555555555",
        isAvailable: false
    }
];

export default function Cart() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { cart } = useCart();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    return (
        <ScreenMobile>
            <div className="flex flex-col">
                <div className=" flex flex-row pl-4 pt-4">
                    <p ><Icon icon="weui:back-filled" fontSize={40} onClick={() => router.back()} /></p>
                    <p className="w-full text-2xl  text-center font-semibold pt-1">ตะกร้าของฉัน</p>
                </div>
                <div className="flex px-4 pt-5 pb-23" >
                    <MenuCardList menuList={menuList} />
                </div>
                <div className="flex flex-row justify-between pt-5 border-b-2 pb-3 w-11/12 mx-auto">
                    <p className="text-xl font-bold "> จำนวนรายการอาหาร :</p>
                    <p className=" text-xl font-bold "> {cart.reduce((acc, item) => acc + item.quantity, 0)} รายการ</p>
                </div>
                <div className="flex pt-6 justify-center pb-6">
                    <button onClick={() => setIsOpen((o) => !o)} className="bg-primary text-white font-bold text-lg py-3 px-4 rounded-lg w-11/12 pb-4 shadow-lg">
                        สั่งอาหารเลย
                    </button>
                </div >
                <ConfirmOrderDialog openDialog={isOpen} setOpenDialog={setIsOpen} title="ยืนยันการสั่งอาหาร" description="กรุณากดยืนยันเพื่อสั่งอาหาร" callback={() => router.push('/user/history')} />
            </div>
        </ScreenMobile>
    );

}