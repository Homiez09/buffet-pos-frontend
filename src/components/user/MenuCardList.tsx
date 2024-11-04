'use client';

import { BaseMenuResponse } from "@/interfaces/menu";
import MenuCard from "./MenuCard";
import { useCart } from "@/provider/CartProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function MenuCardList({ menuList }: { menuList: BaseMenuResponse[] }) {
    const { cart } = useCart();

    const filteredMenuList = menuList.filter((i) =>
        cart.some((j) => j.menu_id === i.id)
    );

    return (
        <div className="flex flex-col gap-3 w-full">
            { cart.length === 0 ? <div className="flex justify-center items-center w-full flex-col ">
                <Icon icon="akar-icons:cart" fontSize={250} className="flex self-center text-grey w-full justify-center`" />
                <p className=" flex text-2xl font-bold text-center justify-center ">ยังไม่มีรายการอาหารในตะกร้า</p>
                <p className=" flex text-xl  text-center justify-center ">กดปุ่มเพื่อสั่งอาหารเลย</p>
            </div>
                : <>
                    {filteredMenuList.map((item: BaseMenuResponse) => (
                        <MenuCard key={item.id} menu={item} />
                    ))}
                </>
            }
        </div>
    );
}
