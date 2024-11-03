'use client'
import React from 'react'

import { ImSpoonKnife } from "react-icons/im";
import { MdTableBar } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { RxExit } from "react-icons/rx";

import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter();
  return (
    <div className='w-3/12 bg-[#FEF8F2] text-black px-10 py-4'>
        <p className='text-3xl'>Buffet</p>
        <p className='text-6xl'>P<span className='text-primary'>O</span>S</p>

        <div className='items-center mt-16 h-9 text-2xl flex hover:text-primary'>
            <ImSpoonKnife />
            <button className='ml-2' onClick={() => router.push('/manager/setting')}>จัดการเมนู</button>
        </div>
        <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary'>
            <MdTableBar />
            <button className='ml-2' onClick={() => router.push('/manager/setting')}>จองโต๊ะ</button>
        </div>
        <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary'>
            <IoDocumentText />
            <button className='ml-2' onClick={() => router.push('/manager/order')}>ออเดอร์ปัจจุบัน</button>
        </div>
        <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary'>
            <BsFillCreditCardFill />
            <button className='ml-2' onClick={() => router.push('/manager/all-payment')}>ชำระเงิน</button>
        </div>
        <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary'>
            <FaHistory />
            <button className='ml-2' onClick={() => router.push('/manager/setting')}>ประวัติออเดอร์</button>
        </div>
        <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary'>
            <LuSettings />
            <button className='ml-2' onClick={() => router.push('/manager/setting')}>ตั้งค่าร้าน</button>
        </div>
        <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary'>
            <RxExit />
            <button className='ml-2' onClick={() => router.push('/manager/setting')}>ออกจากระบบ</button>
        </div>

    </div>
  )
}

export default Navbar