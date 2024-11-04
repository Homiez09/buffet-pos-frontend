// Navbar.js
'use client';
import React from 'react';
import { ImSpoonKnife } from "react-icons/im";
import { MdTableBar } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar = () => {
    const router = useRouter();
    return (
        <div className='w-3/12 bg-[#FEF8F2] text-black px-8 py-4 sticky top-0 z-10 h-screen'>
            <p className='text-3xl'>Buffet</p>
            <p className='text-6xl'>P<span className='text-primary'>O</span>S</p>

            <div className='items-center mt-16 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <ImSpoonKnife />
                <span className='ml-2' onClick={() => router.push('/manager/menu')}>จัดการเมนู</span>
            </div>
            <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <MdTableBar />
                <span className='ml-2' onClick={() => router.push('/manager/table-reservation')}>จองโต๊ะ</span>
            </div>
            <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <IoDocumentText />
                <span className='ml-2' onClick={() => router.push('/manager/order')}>ออเดอร์ปัจจุบัน</span>
            </div>
            <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <BsFillCreditCardFill />
                <span className='ml-2' onClick={() => router.push('/manager/all-payment')}>ชำระเงิน</span>
            </div>
            <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <FaHistory />
                <span className='ml-2' onClick={() => router.push('/manager/history')}>ประวัติออเดอร์</span>
            </div>
            <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <LuSettings />
                <span className='ml-2' onClick={() => router.push('/manager/setting')}>ตั้งค่าร้าน</span>
            </div>
            <div className='items-center mt-14 h-9 text-2xl flex hover:text-primary cursor-pointer'>
                <RxExit />
                <span className='ml-2' onClick={() => signOut()}>ออกจากระบบ</span>
            </div>
        </div>
    );
}

export default Navbar;
