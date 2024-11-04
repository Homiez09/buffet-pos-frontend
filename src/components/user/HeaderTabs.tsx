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

export default function HeaderTabs({ search, setSearch } : { search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) {
    const [selected, setSelected] = useState(0);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isSearchShow, setIsSearchShow] = useState<boolean>(false);

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

    const filterItems = items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <>
            <div className="fixed flex flex-col gap-6 bg-white px-3 py-3 max-w-lg w-full">
                <div className="flex overflow-x-scroll scrollbar-hide">
                    <div className="flex flex-row gap-3">
                        <div className="cursor-pointer">
                            <Icon icon="ic:baseline-search" fontSize={30} color='#ff8d13ef' onClick={() => setIsSearchShow(true)} />
                        </div>
                        <div className="cursor-pointer" onClick={() => setIsShow((e: boolean) => !e)}>
                            <Icon icon="ic:round-list" fontSize={30} color='#ff8d13ef' />
                        </div>
                    </div>

                    {isSearchShow && (
                        <div className="flex fixed z-[999] w-full bg-primary  left-0 top-0 flex-row items-center shadow-md rounded-br-lg rounded-bl-lg p-2">
                            <Icon icon="ic:round-close" fontSize={40} color='white' onClick={() => { setIsSearchShow(false); setSearch(''); }} />
                            <input
                                type="text"
                                placeholder="ค้นหาเมนูที่ต้องการ"
                                className="w-full rounded-lg p-[5px] pl-4 shadow-md m-2"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    )}


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

            <div ref={ref} className={`z-[999] fixed bottom-0 flex flex-col gap-2 ${isShow ? 'block' : 'hidden'} shadow-xl bg-white rounded-xl max-w-lg w-full`}>
                <div className="flex flex-row justify-between m-3">
                    <p className="text-lg font-bold">เลือกหมวดหมู่</p>
                    <Icon icon="ic:round-close" fontSize={30} color='#ff8d13ef' onClick={() => setIsShow(false)} />
                </div>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`flex flex-row justify-start gap-2 py-4 px-7 border-b-[1px] ${selected == item.id ? 'text-primary' : 'text-whereBlack'} } `}
                        onClick={() => setSelected(item.id)}>
                        <p className="text-xl">{item.name}</p>
                    </div>

                ))}
            </div>
            {isShow && <div className="fixed inset-0 bg-black opacity-50 z-50" onClick={() => setIsShow(false)}></div>}
        </>
    );
}