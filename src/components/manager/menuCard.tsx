'use client';

import useToastHandler from "@/lib/toastHanlder";
import { useState } from "react";
import { EditMenuDialog } from "./editMenuDialog";
import { ConfirmDialog } from "./confirmDialog";
import { BaseMenuResponse } from "@/interfaces/menu";
import { useGetCategoryById } from "@/api/manager/useCategory";
import LoadingAnimation from "./loadingAnimation";
import Image from "next/image";
import { useDeleteMenu } from "@/api/manager/useMenu";


export default function MenuCard({ menu, refetchMenus }: {menu: BaseMenuResponse, refetchMenus: () => void}) {

    const toaster = useToastHandler();
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
    const { data: category, isLoading: loadingCategory } = useGetCategoryById(menu.categoryId);

    const deleteMenu = useDeleteMenu();

    if (loadingCategory) {
        return <LoadingAnimation/>
    }

    const deleteHandler = () => {
        setOpenDeleteDialog(true);
    }

    const editHandler = () => {
        setOpenDialog(true);
    }

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure className="h-3/5">
                <Image
                    src={menu.imageUrl}
                    alt={menu.name}
                    width={100}
                    height={100}
                    layout=""
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{menu.name}</h2>
                    <p>type: {category?.name}</p>
                    <p>status: {menu.isAvailable}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-info text-whereWhite" onClick={() => editHandler()}>edit</button>
                    <button className="btn btn-error text-whereWhite" onClick={() => deleteHandler()}>delete</button>
                </div>
            </div>
            <EditMenuDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
            <ConfirmDialog openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog} title="แน่ใจหรือไม่ว่าต้องการลบ?" description="แน่ใจหรือไม่ว่าต้องการลบ “แซลมอนย่าง”" callback={async () => {
                await deleteMenu.mutateAsync(menu.id);
                toaster("ลบเมนูสำเร็จ", "คุณทำการลบเมนูสำเร็จ")
                refetchMenus();
            }} />
        </div>
    )
}
