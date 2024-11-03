'use client';

import ScreenMobile from "@/components/ScreenMobile";
import HeaderTabs from "@/components/user/HeaderTabs";
import OrderButton from "@/components/user/OrderButton";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MenuCardList from "@/components/user/MenuCardList";

export default function Home() {
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log(searchParams.get('accessKey'))
  }, [searchParams])

  return (
    <ScreenMobile>
      <HeaderTabs />
      <div className = "flex flex-col gap-2 px-3 pt-16 pb-24">
      <div>
      <div className="flex flex-row justify-between">
        <p className=" w-1/3 font-bold text-lg pl-1"> โต๊ะที่ : 21 </p>
        <p className=" w-2/3 font-bold text-lg pl-12"> เวลาในการทาน : 54 นาที </p>
      </div>
      <p className="text-primary text-xl text-right pr-1"> 20:18 น. </p>
      </div >
      <div className = " m-2">
      <MenuCardList />
      </div>
      </div>
      <OrderButton />
    </ScreenMobile>
  );
}
