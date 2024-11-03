import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


type ConfirmDeliverDialogProps = {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void
    callback?: () => void
    tableName: string
}


const ModifyTableNameDialog = ({ openDialog, setOpenDialog, callback, tableName }: ConfirmDeliverDialogProps) => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <div className="py-10 align-middle gap-6 flex items-center">
                    <label className="text-2xl font-bold">ชื่อโต๊ะ: </label>
                    <input className="rounded border-2 h-12 w-80 p-3   " value={tableName} />
                </div>
                <div className="flex">
                    <DialogClose asChild>
                        <Button className="font-bold ml-auto btn text-xl text-white bg-error rounded-xl" >
                            ยกเลิก
                        </Button>
                    </DialogClose>
                    <button className="text-xl bg-primary btn rounded-xl text-white ml-3">เพิ่มโต๊ะ</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModifyTableNameDialog