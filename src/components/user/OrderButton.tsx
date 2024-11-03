'use client';

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function OrderButton() {
    const router = useRouter();

    return (
        <div className="fixed bottom-0 right-0 p-5">
            <div className="flex flex-row gap-3">
                <div className="bg-primary rounded-full p-3" onClick={()=>router.push('/user/cart')}>
                    <Icon icon="ic:baseline-shopping-cart" fontSize={30} color='#fff' />
                </div>
                <div className="bg-primary rounded-full p-3" onClick={()=>router.push('/user/history')}>
                    <Icon icon="ic:baseline-history" fontSize={30} color='#fff' />
                </div>
            </div>
        </div>
    );
}