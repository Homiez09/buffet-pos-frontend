'use client';

import { useGetMenus } from "@/api/user/useMenu";
import { useAddOrders } from "@/api/user/useOrder";
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import ScreenMobile from "@/components/ScreenMobile";
import { ConfirmOrderDialog } from "@/components/user/ConfirmOrderDialog";
import MenuCardList from "@/components/user/MenuCardList";
import { BaseMenuResponse } from "@/interfaces/menu";
import { OrderRequest } from "@/interfaces/order";
import axiosInstance from "@/lib/axiosInstance";
import { useCart } from "@/provider/CartProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cart() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { cart, accessCode, clearCart } = useCart();
    const { data: menus, isLoading: isMenuLoading } = useGetMenus(accessCode);

    const router = useRouter();



    const onSubmit = async () => {
        const payload: OrderRequest = {
            order_items: [
                {
                    menu_id: "string",
                    quantity: 0
                }
            ]
        }
        console.log(payload.order_items[1]);

        await axiosInstance.post("/customer/orders", payload, {
            headers: {
                AccessCode: accessCode,
            },
        }).then((res) => {
            clearCart();
            router.push("/user/history");
        }).catch((err) => {
            console.log(err);
        });

    }
    return (
        <ScreenMobile>
            <div className="flex flex-col">
                <div className=" flex flex-row pl-4 pt-4">
                    <p ><Icon icon="weui:back-filled" fontSize={40} onClick={() => router.back()} /></p>
                    <p className="w-full text-2xl  text-center font-semibold pt-1">ตะกร้าของฉัน</p>
                </div>
                <div className="flex px-4 pt-5 pb-23 w-full" >
                    <MenuCardList menuList={menus!} />
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
                <ConfirmOrderDialog callback={onSubmit} openDialog={isOpen} setOpenDialog={setIsOpen} title="ยืนยันการสั่งอาหาร" description="กรุณากดยืนยันเพื่อสั่งอาหาร" />
            </div>
        </ScreenMobile>
    );

}