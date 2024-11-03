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
      <MenuCardList />
      </div>
      <OrderButton />
    </ScreenMobile>
  );
}
