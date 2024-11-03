import Navbar from "@/components/Navbar";

export default function ManagerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-row h-fit min-h-[100vh]">
            {/**<div className="bg-black w-3/12">sample nav</div> **/}
            <Navbar/>
            <div className="w-full h-full bg-whereWhite px-10 py-4">{children}</div>
        </div>
    )
}