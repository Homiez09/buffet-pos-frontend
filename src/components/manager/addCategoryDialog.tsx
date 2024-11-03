import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog";

type AddCategoryProps = {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
};

const AddCategoryDialog = ({ openDialog, setOpenDialog }: AddCategoryProps) => {
    const [inputCategory, setInputCategory] = useState("");

    const handleSave = () => {
        // Perform save operation here if needed
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setOpenDialog(false); // This will close the dialog
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <div className="py-10 align-middle gap-2 flex items-center">
                    <label className="text-2xl font-bold">เพิ่มประเภท </label>
                    <input
                        className="rounded border-2 h-12 w-80 p-3"
                        value={inputCategory}
                        onChange={(e) => setInputCategory((e.target.value))}
                    />
                </div>
                <div className="flex">
                    <DialogClose asChild>
                        <Button className="font-bold ml-auto btn text-xl text-white bg-error rounded-xl" >
                            ยกเลิก
                        </Button>
                    </DialogClose>
                    <button className="text-xl bg-success btn rounded-xl text-white ml-3" onClick={handleSave}>บันทึก</button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;
