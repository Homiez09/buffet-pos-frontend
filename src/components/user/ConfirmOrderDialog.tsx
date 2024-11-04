import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type ConfirmDialogProps = {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  title: string
  description: string
  callback?: () => void
}

export function ConfirmOrderDialog({ openDialog, setOpenDialog, title, description, callback }: ConfirmDialogProps) {
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent className=" rounded-md p-5 self-center ">
        <AlertDialogHeader className=" space-y-[]">
          <AlertDialogTitle className="text-xl text-start">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-start text-lg" >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end gap-2 items-center">
          <AlertDialogCancel className="bg-grey text-white">ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={callback} className="bg-success text-white self-end">ยืนยัน</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}