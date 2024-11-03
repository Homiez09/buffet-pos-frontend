import Image from 'next/image'

export default function MenuConfirmCard() {
    return (
        <div className="flex border bg-white rounded-2xl">
            <div className="flex w-2/5 p-3">
                <Image className='rounded-xl'
                    src={'/assets/images/sample-salmon.svg'}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className="flex flex-col w-3/5 p-4">
                <p className="text-2xl mt-[-12px] m-[-18px] ">M1 Somtum</p>
                <p className="text-2xl mt-[18px] m-[-18px] ">x 1</p>
                <div className = "flex border w-full h-full justify-end items-end">
                    <p className="text-lg text-white border border-success bg-success rounded-[8px] px-3  py-[3px] ">กำลังทำอาหาร</p>
                </div>
            </div>
        </div>
    );
}