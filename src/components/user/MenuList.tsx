import { BaseMenuResponse } from "@/interfaces/menu";
import MenuCard from "./MenuCard";

export default function MenuList({ title, menuList }: { title: string, menuList: BaseMenuResponse[] }) {
    return (
        <section id={title} className="flex flex-col gap-2" >
            <p className=" text-xl font-bold pl-1 pb-3">{title}</p> 
                {menuList.map((item: BaseMenuResponse, index: number) => <MenuCard key={index} menu={item} />)}
        </section>
    );
}