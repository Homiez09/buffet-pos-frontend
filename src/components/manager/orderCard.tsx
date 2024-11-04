'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { OrderItemResponse } from '@/interfaces/order';
import Image from "next/image";
import LoadingAnimation from './loadingAnimation';
import { useGetMenuByID, useGetMenus } from '@/api/manager/useMenu';
import { useGetCategoryById } from '@/api/manager/useCategory';



export default function OrderCard({ orderItem }: {orderItem: OrderItemResponse}) {
    const { data: menu , isLoading: loadingMenus } = useGetMenuByID(orderItem.menuID);
    const { data: category, isLoading: loadingCategory } = menu?.categoryId 
        ? useGetCategoryById(menu.categoryId) 
        : { data: null, isLoading: false };

    if (loadingMenus) {
        return <LoadingAnimation/>
    }


    return (
        <div className="flex flex-col w-48 shadow-md m-2 p-2 rounded-lg gap-3">
            <figure className="h-full w-full">
                <Image
                    src={menu?.imageUrl || "/default-image.png"}
                    alt={menu?.name|| "Menu Image"}
                    width={100}
                    height={100}
                    layout=""
                    className="object-cover w-full h-full"
                />
            </figure>
          <div className="w-full flex flex-col">
            <h2 className="card-title">{menu?.name}</h2>
            <div>
                <h2 className="card-title">{category?.name || "No Category"}</h2>
            </div>
          </div>
          <div className="w-full justify-end flex flex-row">x1</div>
        </div>
      );
    
}
