'use client';

import ScreenMobile from "@/components/ScreenMobile";
import HeaderTabs from "@/components/user/HeaderTabs";
import OrderButton from "@/components/user/OrderButton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MenuList from "@/components/user/MenuList";
import { BaseMenuResponse } from "@/interfaces/menu";

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

export default function Home() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    console.log(searchParams.get('accessKey'))
  }, [searchParams])

  return (
      <ScreenMobile>
        <HeaderTabs search={search} setSearch={setSearch} />
        <div className="flex flex-col gap-2 px-3 pt-16 pb-24">
          <div className="flex flex-row justify-between w-full">
            <p className=" w-1/3 font-bold text-lg pl-1"> โต๊ะที่ : 21 </p>
            <p className=" w-2/3 font-bold text-lg pl-12 text-end"> เวลาในการทาน : 54 นาที </p>
          </div>
          <p className="text-primary text-xl text-right pr-1"> 20:18 น. </p>
          <div className="m-2 space-y-10">
            <MenuList title="หมู" menuList = {menuList} />
            <MenuList title="เนื้อ" menuList = {menuList} />
          </div>
        </div>
        <OrderButton />
      </ScreenMobile>
  );
}
