'use client';

import { useGetMenuById } from '@/api/user/useMenu';
import { OrderItemResponse } from '@/interfaces/order';
import { useCart } from '@/provider/CartProvider';
import Image from 'next/image'

export default function MenuCompleteCard({ item, status }: { item: OrderItemResponse, status: string }) {
    const { accessCode } = useCart();
    const { data: menu, isLoading } = useGetMenuById(accessCode, item.menuID);

    if (isLoading) return <Skeleton />;

    return (
        <div className="flex border bg-white rounded-2xl">
            <div className="flex w-2/5 h-[125px] p-3">
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image className=''
                        src={menu!.imageUrl}
                        alt="Picture of the author"
                        layout="fill"
                    />
                </div>
            </div>
            <div className="flex flex-col w-3/5 p-4">
                <p className="text-xl  mt-[-6px] m-[-18px]">{menu?.name}</p>
                <p className="text-xl mt-[17px] m-[-18px] ">x {item.quantity}</p>
                <div className="flex  w-full h-full justify-end items-end">
                    <p className={`text-l text-white ${status === "preparing" ? 'bg-info' : 'bg-success'} rounded-[8px] px-4  py-[2px]`}>{status}</p>
                </div>
            </div>
        </div>
    );
}

const Skeleton = () => {
    return (
        <div className="flex border bg-white rounded-2xl">
            <div className="flex w-2/5 p-3">
                <div className="animate-pulse w-full h-full bg-gray-200 rounded-xl"></div>
            </div>
            <div className="flex flex-col w-3/5 p-4">
                <div className="flex flex-col h-full" >
                    <div className="animate-pulse w-full h-6 bg-gray-200 rounded-xl"></div>
                    <div className="animate-pulse w-full h-6 bg-gray-200 rounded-xl"></div>
                    <div className="animate-pulse w-full h-6 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
}
