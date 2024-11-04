import { BaseMenuResponse } from "@/interfaces/menu";
import MenuCard from "./MenuCard";

const menuList:BaseMenuResponse[] = [
    {
        id: "0",
        name: "Pork",
        description: "moo ouan",
        categoryId: "2",
        imageUrl: "222222222222",
        isAvailable: true
    },
    {
        id: "1",
        name: "Beef",
        description: "neua yang",
        categoryId: "1",
        imageUrl: "111111111111",
        isAvailable: true
    },
    {
        id: "2",
        name: "Chicken",
        description: "gai tod",
        categoryId: "3",
        imageUrl: "333333333333",
        isAvailable: false
    },
    {
        id: "3",
        name: "Shrimp",
        description: "goong pad",
        categoryId: "4",
        imageUrl: "444444444444",
        isAvailable: true
    },
    {
        id: "4",
        name: "Fish",
        description: "pla khao",
        categoryId: "5",
        imageUrl: "555555555555",
        isAvailable: false
    }
];

export default function MenuList({ title } : { title: string }) {
    return(
        <div className="flex flex-col gap-2" >
            <p className=" text-xl font-bold pl-1 pb-3">{title}</p>
            {menuList.map((item:BaseMenuResponse,index:number) => <MenuCard key={index} menu={item} />) }
        </div>
    );
}