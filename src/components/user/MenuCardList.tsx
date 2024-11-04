import { BaseMenuResponse } from "@/interfaces/menu";
import MenuCard from "./MenuCard";
import { useCart } from "@/provider/CartProvider";

const menuList: BaseMenuResponse[] = [
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

export default function MenuCardList() {
    const { cart } = useCart();

    const filteredMenuList = menuList.filter((i) =>
        cart.some((j) => j.menu_id === i.id)
    );

    return (
        <div className="flex flex-col gap-3">
            {filteredMenuList.map((item: BaseMenuResponse) => (
                <MenuCard key={item.id} menu={item} />
            ))}
        </div>
    );
}
