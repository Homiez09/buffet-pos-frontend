import MenuCardList from "@/components/user/MenuCardList";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Cart() {
    return (<div className="flex flex-col">
        <div className=" flex flex-row pl-4 pt-4">
            <div className="border "><Icon icon="weui:back-filled" fontSize={40} className="" /></div>
            <p className="w-full text-2xl border text-center font-semibold pt-1">ตะกร้าของฉัน</p>
        </div>
        <div className="flex px-3 pt-5 pb-23" >
            <MenuCardList />
        </div>
        <div className="flex flex-row justify-between pt-5 border-b-2 pb-5 w-11/12 mx-auto">
            <p className="text-xl font-bold "> จำนวนรายการอาหาร :</p>
            <p className=" text-xl font-bold "> 100 รายการ</p>
        </div>
        <div className="flex pt-6 justify-center pb-6">
            <button className="bg-primary text-white font-bold text-xl py-3 px-4 rounded-lg w-10/12 pb-4 shadow-lg">
                สั่งอาหารเลย
            </button>
        </div >

    </div>);
}