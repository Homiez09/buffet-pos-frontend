import { BaseMenuResponse } from "@/interfaces/menu";
import MenuCard from "./MenuCard";


<<<<<<< HEAD
export default function MenuList({ title, menuList } : { title: string, menuList: BaseMenuResponse[] }) {
    return(
=======
export default function MenuList({ title, menuList }: { title: string, menuList: BaseMenuResponse[] }) {
    return (
>>>>>>> 0d3df5adcb589edc49ca7827ceaeb9f8135eb9a5
        <div className="flex flex-col gap-2" >
            <p className=" text-xl font-bold pl-1 pb-3">{title}</p>
            {menuList.map((item: BaseMenuResponse, index: number) => <MenuCard key={index} menu={item} />)}
        </div>
    );
}