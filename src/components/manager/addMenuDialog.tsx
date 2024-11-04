'use client';

import { useGetCategories } from "@/api/manager/useCategory";
import { useAddMenu } from "@/api/manager/useMenu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AddMenuRequest } from "@/interfaces/menu";
import { UseMutationResult } from "@tanstack/react-query";
import { DefaultDropdown } from "./defaultDropdown";
import { useEffect, useState } from "react";
import LoadingAnimation from "./loadingAnimation";
import Image from "next/image";

interface AddMenuDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    refetchMenus: () => void;
}

export function AddMenuDialog({ openDialog, setOpenDialog, refetchMenus }: AddMenuDialogProps) {

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [inputMenuName, setInputMenuName] = useState<string>("");
    const [inputFile, setInputFile] = useState<File | null>(null);

    const addMenu = useAddMenu();
    const { data: categories, isLoading: loadingCategories, refetch: refetchCategories } = useGetCategories();

    useEffect(() => {
        refetchCategories();
    }, [openDialog]);

    if (loadingCategories) return <LoadingAnimation />;

    

    if (!categories) {
        return null;
    }

    const addMenuHandler = async () => {

        if (!inputMenuName || !selectedCategory || !inputFile) {
            return;
        }

        const categoryData = categories.find((c) => c.name === selectedCategory);

        const data: AddMenuRequest = {
            name: inputMenuName,
            categoryId: categoryData?.id,
            image: inputFile,
            isAvailable: true,
        };

        await addMenu.mutateAsync(data);
        setOpenDialog(false);
        refetchMenus();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setInputFile(file);
    };

    return (
        <Dialog open={openDialog}>
            <DialogContent className="sm:max-w-2xl w-full flex flex-col gap-6">
                <div className="flex flex-row h-full w-full gap-6">
                    <div className="border-primary border rounded-lg w-5/12 max-h-[16rem] overflow-hidden">
                            <Image
                                src={inputFile ? URL.createObjectURL(inputFile) : "/assets/images/no-img.svg"}
                                alt="menu-image"
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                            />
                    </div>
                    <div className="flex flex-col w-7/12 gap-3">
                        <div className="flex flex-col gap-2">
                            <div>Menu Name:</div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                value={inputMenuName}
                                onChange={(e) => setInputMenuName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Type:</div>
                            <DefaultDropdown
                                list={categories && categories.map((c) => c.name)}
                                setSelected={setSelectedCategory}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Image:</div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <div className="btn btn-error text-whereWhite" onClick={() => setOpenDialog(false)}>Cancel</div>
                    <div className="btn btn-primary text-whereWhite" onClick={() => addMenuHandler()}>+ Add Menu</div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
