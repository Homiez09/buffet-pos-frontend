'use client';
import { ConfirmDialog } from "@/components/manager/confirmDialog";
import { ConfirmOrderDialog } from "@/components/user/ConfirmOrderDialog";
import MenuCardList from "@/components/user/MenuCardList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cart() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    return (<div className="flex flex-col">
        <div className=" flex flex-row pl-4 pt-4">
            <p ><Icon icon="weui:back-filled" fontSize={40} onClick={() => router.back()} /></p>
            <p className="w-full text-2xl  text-center font-semibold pt-1">ตะกร้าของฉัน</p>
        </div>
        <div className="flex px-4 pt-5 pb-23" >
            <MenuCardList />
        </div>
        <div className="flex flex-row justify-between pt-5 border-b-2 pb-3 w-11/12 mx-auto">
            <p className="text-xl font-bold "> จำนวนรายการอาหาร :</p>
            <p className=" text-xl font-bold "> 100 รายการ</p>
        </div>
        <div className="flex pt-6 justify-center pb-6">
            <button onClick={() => setIsOpen((o) => !o)} className="bg-primary text-white font-bold text-lg py-3 px-4 rounded-lg w-11/12 pb-4 shadow-lg">
                สั่งอาหารเลย
            </button>
        </div >
        <ConfirmOrderDialog openDialog={isOpen} setOpenDialog={setIsOpen} title="ยืนยันการสั่งอาหาร" description="กรุณากดยืนยันเพื่อสั่งอาหาร" callback={() => router.push('/user/history')}/>

    </div>);

}