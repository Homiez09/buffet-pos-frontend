'use client';

import { BaseMenuResponse } from '@/interfaces/menu';
import { useCart } from '@/provider/CartProvider';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image'
import { useState } from 'react';

export default function MenuCard({ menu }: { menu: BaseMenuResponse }) {
    const { cart, addItem } = useCart();
    const [amount, setAmount] = useState<number>(cart.find((j) => j.menu_id === menu.id)?.quantity ?? 0);

    const increment = () => {
        setAmount(preAmount => preAmount + 1);
        addItem({ menu_id: menu.id, quantity: 1 });
    }
    const decrement = () => {
        if (amount > 0) {
            setAmount(preAmount => preAmount - 1);
            addItem({ menu_id: menu.id, quantity: -1 });
        }
    }

    return (
        <div className={`flex border bg-white rounded-2xl ${menu.isAvailable ? "" : "opacity-80 "}`}>
            <div className="flex w-2/5 p-3 h-[125px] relative">
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image className=''
                        src={menu.imageUrl}
                        alt="Picture of the author"
                        layout="fill"
                    />
                </div>
            </div>
            <div className="flex flex-col w-3/5 p-4">
                <div className="flex flex-col h-full" >
                    <p className="text-xl  mt-[-6px] m-[-18px]">{menu.name}</p>
                </div>
                {!menu.isAvailable ? <p className='flex text-xl text-error justify-end w-full pr-2'>- สินค้าหมด -</p> : <div className="flex justify-end h-full items-end pr-3 pb-1" >
                    <div className="flex flex-row items-center gap-3" >
                        <div className='hover:cursor-pointer' onClick={decrement}>
                            <Icon icon="simple-line-icons:minus" fontSize={40} color={amount != 0 ? "#FF8B13" : "#bfbfbf"} />
                        </div>
                        <p className='text-2xl'>{amount}</p>
                        <div className='hover:cursor-pointer' onClick={increment}>
                            <Icon icon="simple-line-icons:plus" fontSize={40} color='#FF8B13' />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );

}