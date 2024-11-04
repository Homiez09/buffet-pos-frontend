'use client';

import { useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';

const items = [
    { id: 0, name: "หมู" },
    { id: 1, name: "เนื้อ" },
    { id: 2, name: "ผักและเห็ด" },
    { id: 3, name: "ทะเล" },
    { id: 4, name: "ข้าว" },
    { id: 5, name: "ของหวาน" },
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
            <div className="fixed flex flex-col gap-6 bg-white px-3 py-3 max-lg:max-w-full max-w-lg w-full">
                <div className="flex overflow-x-scroll scrollbar-hide">
                    <div className="flex flex-row gap-3">
                        <div className="cursor-pointer">
                            <Icon icon="ic:baseline-search" fontSize={30} color='#ff8d13ef' />
                        </div>
                        <div className="cursor-pointer" onClick={() => setIsShow((e: boolean) => !e)}>
                            <Icon icon="ic:round-list" fontSize={30} color='#ff8d13ef' />
                        </div>
                    </div>

                    <div className="flex flex-row w-full items-center whitespace-nowrap gap-6 pl-5">
                        {items.map((item) => (
                            <div
                                className={`relative border-transparent pb-1 ${selected === item.id ? 'border-b-0' : null}`}
                                onClick={() => setSelected(item.id)}
                            >
                                <p className={selected === item.id ? "text-whereOrange" : "text-whereBlack"}>
                                    {item.name}
                                </p>
                                {selected === item.id && (
                                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-1 h-1 bg-whereOrange rounded-full"></span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={ref} className={`z-[999] fixed bottom-0 flex flex-col gap-2 ${isShow ? 'block' : 'hidden'} w-full shadow-xl bg-white rounded-xl`}>
                <div className="flex flex-row justify-between m-3">
                    <p className="text-lg font-bold">เลือกหมวดหมู่</p>
                    <Icon icon="ic:round-close" fontSize={30} color='#ff8d13ef' onClick={() => setIsShow(false)} />
                </div>
                {items.map((item) => (
                    <div key={item.id} className="flex flex-row items-center justify-center gap-2 py-3 px-2 border-b-[1px]">
                        <p className=" text-2xl">{item.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
}