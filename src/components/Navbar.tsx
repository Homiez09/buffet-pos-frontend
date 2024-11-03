import React from 'react'

const Navbar = () => {
  return (
    <div className='w-3/12 bg-[#FEF8F2] text-black px-10 py-4 h-screen'>
        <p className='text-3xl'>Buffet</p>
        <p className='text-6xl'>P<span className='text-primary'>O</span>S</p>

        <div className='mt-16 h-9 text-2xl flex'>
            <img className='mr-4'src="\assets\navbar-logo\spoonfork.svg"/>
            <button>จัดการเมนู</button>
        </div>
        <div className='mt-14 h-9 text-2xl flex'>
        <img className='mr-4'src="\assets\navbar-logo\table.svg"/>
            <button>จองโต๊ะ</button>
        </div>
        <div className='mt-14 h-9 text-2xl flex'>
            <img className='mr-4'src="\assets\navbar-logo\order.svg"/>
            <button>ออเดอร์ปัจจุบัน</button>
        </div>
        <div className='mt-14 h-9 text-2xl flex'>
            <img className='mr-4'src="\assets\navbar-logo\payment.svg"/>
            <button>ชำระเงิน</button>
        </div>
        <div className='mt-14 h-9 text-2xl flex'>
            <img className='mr-4' src="\assets\navbar-logo\rewind.svg"/>
            <button>ประวัติออเดอร์</button>
        </div>
        <div className='mt-14 h-9 text-2xl flex'>
            <img className='mr-4'src="\assets\navbar-logo\setting.svg"/>
            <button>ตั้งค่าร้าน</button>
        </div>
        <div className='mt-14 h-9 text-2xl flex'>
            <img className='mr-4'src="\assets\navbar-logo\logout.svg"/>
            <button>ออกจากระบบ</button>
        </div>

    </div>
  )
}

export default Navbar