import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import AddMemberDialog from "./addMemberDialog";
  
  type Member = {
    phone: string;
    points: number;
  };
  
  type ConfirmDialogProps = {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    callback?: () => void;
  };
  
  export function UsePointDialog({ openDialog, setOpenDialog, callback } : ConfirmDialogProps) {
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [members, setMembers] = useState<Member[]>([
        { phone: "064-293-xxxx", points: 9 },
        { phone: "222-111-xxxx", points: 1 },
        { phone: "113-333-xxxx", points: 1 },
        { phone: "442-454-xxxx", points: 1 },
        { phone: "142-252-xxxx", points: 1 },
        { phone: "543-233-xxxx", points: 9 },
    ]);

  
    const handleMemberSelect = (phone: string) => {
      setSelectedMember(phone);
    };
  
    const handleConfirm = () => {
      if (!selectedMember) {
        setError("กรุณาเลือกสมาชิก");
        return;
      }
      if (!pin) {
        setError("กรุณากรอก PIN");
        return;
      }

      const selectedMemberData = members.find(m => m.phone === selectedMember);
      if (selectedMemberData && selectedMemberData.points === 0) {
        setError("แต้มไม่เพียงพอ");
        return;
      }

      setMembers((prev) =>
        prev.map((m) =>
          m.phone === selectedMember ? { ...m, points: Math.max(m.points - 1, 0) } : m
        )
      );

      setSelectedMember(null);
      setPin("");
      setError("");
      callback?.();
      setOpenDialog(false);
    };
  
    return (
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="max-w-lg w-full p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <AlertDialogTitle className="font-bold text-lg">เลือกสมาชิกที่ต้องการใช้แต้มสะสม</AlertDialogTitle>
            <button onClick={() => setOpenDialog(false)}>
              <p className="w-5 h-5 font-bold">X</p>
            </button>
          </div>
  
          <div className="flex justify-between my-3">
            <input placeholder="ค้นหาเบอร์โทรศัพท์" className="border px-3 py-2 rounded-md w-full" />
            <Button className="ml-3" onClick={() => setOpen(true)}>+ เพิ่มสมาชิก</Button>
            <AddMemberDialog open={open} onClose={() => setOpen(false)} />
          </div>
  
          <div className="overflow-y-auto max-h-60 border rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">เบอร์โทรศัพท์</th>
                  <th className="px-4 py-2">แต้มสะสม</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.phone}
                    className={`border-t cursor-pointer ${selectedMember === member.phone ? "bg-orange-100" : ""}`}
                    onClick={() => handleMemberSelect(member.phone)}
                  >
                    <td className="px-4 py-2 flex items-center gap-2">
                      <input type="radio" name="member" checked={selectedMember === member.phone} readOnly />
                      {member.phone}
                    </td>
                    <td className="px-4 py-2 text-orange-500 font-bold">{member.points} / 10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="mt-4">
            <label className="font-semibold">PIN : </label>
            <input
              type="password"
              placeholder="กรอก PIN"
              className="border px-3 py-2 rounded-md w-full"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            {error && <p className="pl-2 pt-2 text-red-500 text-sm mt-1">{error}</p>}
          </div>
  
          <Button className="w-full bg-orange-500 text-white mt-4" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  