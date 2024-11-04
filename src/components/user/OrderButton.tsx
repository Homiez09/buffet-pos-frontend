'use client';

import { useCart } from "@/provider/CartProvider";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function OrderButton() {
    const router = useRouter();
    const { cart } = useCart();

    return (
        <div className="fixed bottom-0 right-0 p-5">
            <div className="flex flex-row gap-3">
                <div className="relative bg-primary rounded-full p-3" onClick={()=>router.push('/user/cart')}>
                   {cart.length > 0 && <div className="absolute top-0 right-0 bg-white rounded-lg shadow-lg text-sm text-whereBlack px-1">
                        <p className="text-sm">{cart.reduce((acc, item) => acc + item.quantity, 0) > 99 ? '99+' : cart.reduce((acc, item) => acc + item.quantity, 0) }</p>
                    </div>}
                    <Icon icon="ic:baseline-shopping-cart" fontSize={30} color='#fff' />
                </div>
                <div className="bg-primary rounded-full p-3" onClick={()=>router.push('/user/history')}>
                    <Icon icon="ic:baseline-history" fontSize={30} color='#fff' />
                </div>
            </div>
        </div>
    );
}