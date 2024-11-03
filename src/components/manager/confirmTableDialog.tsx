import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
   
  export function ConfirmTableDialog({ openDialog, setOpenDialog }: { openDialog: boolean, setOpenDialog: (open: boolean) => void }) {
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
                      <div className="dropdown w-full">
                          <div tabIndex={0} role="button" className="btn w-full">Select here</div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li><a>Item 1</a></li>
                              <li><a>Item 2</a></li>
                          </ul>
                      </div>
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