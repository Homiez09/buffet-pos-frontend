import { OrderItemResponse } from '@/interfaces/order';
import Image from 'next/image'

export default function MenuCompleteCard({ item, status } : { item: OrderItemResponse, status: string }) {
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
                <p className="text-xl  mt-[-6px] m-[-18px]">{item.menuID}</p>
                <p className="text-xl mt-[17px] m-[-18px] ">x 1</p>
                <div className="flex  w-full h-full justify-end items-end">
                    <p className={`text-l text-white ${status === "preparing" ? 'bg-info' : 'bg-success'} rounded-[8px] px-4  py-[2px]`}>{status}</p>
                </div>
            </div>
        </div>
    );
}