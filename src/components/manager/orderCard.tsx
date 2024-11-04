'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { OrderItemResponse } from '@/interfaces/order';
import Image from "next/image";
import LoadingAnimation from './loadingAnimation';
import { useGetMenuByID } from '@/api/manager/useMenu';
import { useGetCategoryById } from '@/api/manager/useCategory';

export default function OrderCard({ orderItem }: {orderItem: OrderItemResponse}) {
    
    const { data: menu, isLoading: loadingMenus } = useGetMenuByID(orderItem.menuID);
    const { data: category, isLoading: loadingCategory } = useGetCategoryById(menu?.categoryId || '');

    if (loadingMenus) {
        return <LoadingAnimation />;
    }

    return (
        <div className="flex flex-col w-48 shadow-md m-2 p-2 rounded-lg gap-3">
            <figure className="h-full w-full">
                <Image
                    src={menu?.imageUrl || "/default-image.png"}
                    alt={menu?.name || "Menu Image"}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full rounded-lg"
                />
            </figure>
            <div className="w-full flex flex-col">
                <h2 className="card-title text-md">Menu: {menu?.name}</h2>
                <div>
                </div>
            </div>
            <div className="w-full justify-between flex flex-row">
                <h2 className="card-title text-sm">Type: {loadingCategory ? "Loading..." : category?.name || "No Category"}</h2>
                <div>x{orderItem.quantity}</div>
            </div>
        </div>
    );
}
