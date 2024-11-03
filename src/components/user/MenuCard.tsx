'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image'
import { useState } from 'react';

export default function MenuCard() {
    const [amount, setAmount] = useState(0);
    const increment = () => {
        setAmount(preAmount => preAmount + 1);
    }
    const decrement = () => {
        if (amount > 0){
            setAmount(preAmount => preAmount - 1);
        }
    }

    {
    return (
        <div className="flex border bg-white rounded-2xl">
            <div className="flex w-2/5 p-3">
                <Image className='rounded-xl'
                    src={'/assets/images/sample-salmon.svg'}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className="flex flex-col w-3/5 p-4">
                <div className = "flex flex-col h-full" >
                    <p className="text-xl  mt-[-6px] m-[-18px]">M1 ไก่ย่างห้าดาว</p>
                </div>
                <div className = "flex justify-end h-full items-end pr-3 pb-1" >
                    <div className="flex flex-row items-center gap-3" >
                        <div className='hover:cursor-pointer' onClick={decrement}>
                        <Icon icon="simple-line-icons:minus" fontSize={40} color= {amount != 0 ? "#FF8B13" : "#bfbfbf"} />
                        </div>
                        <p className='text-2xl'>{amount}</p>
                        <div className='hover:cursor-pointer' onClick={increment}>
                        <Icon icon="simple-line-icons:plus" fontSize={40} color = '#FF8B13' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}