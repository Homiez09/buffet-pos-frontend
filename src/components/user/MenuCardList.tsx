'use client';

import { BaseMenuResponse } from "@/interfaces/menu";
import MenuCard from "./MenuCard";
import { useCart } from "@/provider/CartProvider";

export default function MenuCardList({ menuList }:{menuList: BaseMenuResponse[]}) {
    const { cart } = useCart();

    const filteredMenuList = menuList.filter((i) =>
        cart.some((j) => j.menu_id === i.id)
    );

    return (
        <div className="flex flex-col gap-3 w-full">
            {filteredMenuList.map((item: BaseMenuResponse) => (
                <MenuCard key={item.id} menu={item} />
            ))}
        </div>
    );
}
