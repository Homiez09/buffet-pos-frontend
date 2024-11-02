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
      <MenuCardList />
      <OrderButton />
    </ScreenMobile>
  );
}