'use client';

import Image from 'next/image';
import { useState } from 'react';

interface TableProps {
    default: JSX.Element;
    selected: JSX.Element;
    full: JSX.Element;
}

const tableColor: TableProps = {
    default: <Image draggable={false} src="/assets/images/table.svg" alt="table" width={1000} height={1000} />,
    selected: <Image draggable={false} src="/assets/images/table-selected.svg" alt="table" width={1000} height={1000} />,
    full: <Image draggable={false} src="/assets/images/table-full.svg" alt="table" width={1000} height={1000} />,
}

export default function TableReservation() {
    const [selectedTable, setSelectedTable] = useState<number | null>(null);

    return (
        <div className="flex flex-col select-none">
            <p className="text-2xl font-bold">จองโต๊ะ</p>
            <div className="grid grid-cols-3 gap-y-20 mt-8">
                {[0,1,2,3,4,5].map((_, index) => <div key={index} onClick={() => setSelectedTable(index)} className=" hover:cursor-pointer flex px-16 items-center justify-center">
                    {index === selectedTable ? tableColor.selected : tableColor.default}
                    <p className="absolute text-3xl text-grey">T{index+1}</p>
                </div>)}
            </div>
            <div className="btn btn-primary text-white font-bold text-lg px-8 self-end mt-12" onClick={() => console.log('จอง')}>จองโต๊ะ</div>
        </div>
    )
}