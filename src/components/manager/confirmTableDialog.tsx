import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BaseTableResponse } from "@/interfaces/table";
import { DefaultDropdown } from "./defaultDropdown";
import { useState } from "react";

  interface ConfirmTableDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    selectedTable: BaseTableResponse | null;
    tables: BaseTableResponse[] | undefined;
  }
   
  export function ConfirmTableDialog({ openDialog, setOpenDialog, selectedTable, tables }: ConfirmTableDialogProps) {

    if (!tables) {
        return null;
    }
    
    return (
      <Dialog open={openDialog}>
        <DialogContent className="w-full flex flex-col gap-6">
          <div className="flex flex-col h-full gap-6">
              <div className="flex flex-col w-auto gap-3">
                  <div className="flex flex-row gap-2 items-center">
                      <div className="w-1/3">จำนวนคน:</div>
                      <input type="number" placeholder="Type here" className="input input-bordered w-full" />
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                      <div className="w-1/3">โต๊ะที่:</div>
                      <DefaultDropdown 
                        list={tables.map(table => table.tableName)}
                        selectedTable={selectedTable}
                      />
                  </div>
                
                
              </div>
          </div>
         
          <DialogFooter>
              <div className="btn btn-primary text-whereWhite" onClick={() => setOpenDialog(false)}>เปิดบิล</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }