'use client';

import { useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';

const items = [
    { id: 0, name: "Buffet เนื้อ" },
    { id: 1, name: "Buffet หมู" },
    { id: 2, name: "ผัก" },
    { id: 3, name: "เครื่องดื่ม" },
    { id: 4, name: "ของหวาน" },
    { id: 5, name: "อื่นๆ" },
];

export default function HeaderTabs() {
    const [selected, setSelected] = useState(0);
    const [isShow, setIsShow] = useState<boolean>(false);

    const ref = useRef(null) as any;

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(false);
        }
    }

    return (
        <>
            <div className="fixed flex flex-col gap-5 border py-3 bg-white pl-3 max-lg:max-w-full max-w-lg">
                {/* <div className="flex flex-col items-end px-2">
                <Icon icon="ic:baseline-history" fontSize={35} color='#6b7280' />
            </div> */}
                <div className="flex overflow-x-scroll scrollbar-hide">
                    <div className="flex flex-row gap-3">
                        <div className="cursor-pointer">
                            <Icon icon="ic:baseline-search" fontSize={30} color='#6b7280' />
                        </div>
                        <div className="cursor-pointer" onClick={() => setIsShow((e: boolean) => !e)}>
                            <Icon icon="ic:round-list" fontSize={30} color='#6b7280' />
                        </div>
                    </div>

                    <div className="flex flex-row w-full items-center whitespace-nowrap">
                        {items.map((item) => (
                            <div key={item.id} className="px-4 cursor-pointer">
                                <div className={`border-transparent pb-1 ${selected === item.id ? 'border-b-4 border-[#ff8d13ef]' : null}`} onClick={() => setSelected(item.id)}>
                                    <p className={selected === item.id ? "text-black" : "text-gray-500"}>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={ref} className={`flex flex-col gap-2 ${isShow ? 'block' : 'hidden'} w-full shadow-xl bg-white rounded-xl`}>
                {items.map((item) => (
                    <div key={item.id} className="flex flex-row items-center justify-center gap-2 py-3 px-2">
                        <p className=" text-2xl">{item.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
}