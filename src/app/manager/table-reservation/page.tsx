'use client';

import { useAssignTable, useGetTables } from '@/api/manager/useTable';
import { ConfirmTableDialog } from '@/components/manager/confirmTableDialog';
import LoadingAnimation from '@/components/manager/loadingAnimation';
import { BaseTableResponse } from '@/interfaces/table';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

    const [selectedTable, setSelectedTable] = useState<BaseTableResponse | null>(null);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const { data: tables, isLoading: loadingTables, refetch: refetchTables } = useGetTables();

    if (loadingTables) {
        return <LoadingAnimation />
    }

    return (
        <>
            <div className="flex flex-col select-none">
                <p className="text-2xl font-bold">Table Reservation</p>
                <div className="grid grid-cols-3 gap-y-20 mt-8">
                    {tables && tables.map((table: BaseTableResponse, index: number) => (
                        <div 
                            key={index} 
                            onClick={() => setSelectedTable(table)} 
                            className="hover:cursor-pointer flex px-16 items-center justify-center"
                        >
                            {
                                table.id === selectedTable?.id
                                    ? tableColor.selected
                                    : (table.isAvailable === false ? tableColor.full : tableColor.default)
                            }
                            <p className="absolute text-3xl text-grey">T-{table.tableName}</p>
                        </div>
                    ))}
                </div>
                <div 
                    className={selectedTable ? "btn-primary btn text-white font-bold text-lg px-8 self-end mt-12" : "btn-outline btn text-whereBlack font-bold text-lg px-8 self-end mt-12"} 
                    onClick={() => {
                        if (selectedTable) {
                            setIsOpenPopup(true);
                        }
                    }}
                >
                    จองโต๊ะ
                </div>
            </div>
            <ConfirmTableDialog openDialog={isOpenPopup} setOpenDialog={setIsOpenPopup} selectedTable={selectedTable} tables={tables} refetchTables={refetchTables} />
        </>
    )
}
