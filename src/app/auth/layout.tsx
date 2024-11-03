import { Role } from "@/interfaces/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const session = await getServerSession(authOptions);

    if (session && session.user) {
        if (session?.user?.role == Role.EMPLOYEE || session?.user?.role == Role.MANAGER) {
            redirect("/manager/all-payment");
        }
    }

    return (
        <div className="flex flex-col lg:flex-row w-full justify-center items-center h-screen">
            <div className="bg-primary h-full w-full rounded-lg"></div>
            <div className="w-5/6 flex">{children}</div>
        </div>
    )
}