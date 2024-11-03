import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { OrderResponse } from '@/interfaces/order';
import Image from "next/image";



export default function rderCard({ order, refetchOrders }: {order: OrderResponse, refetchOrders: () => void}) {
    
    return (
        <div className="flex flex-col w-48 shadow-md m-2 p-2 rounded-lg gap-3">
          <div className="w-full">
            <Image
              src="/assets/images/sample-salmon.svg"
              alt="salmon"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <div>M1 แซลมอนรมควัน</div>
            <div>Type: ปลา</div>
          </div>
          <div className="w-full justify-end flex flex-row">x1</div>
        </div>
      );
    
}
