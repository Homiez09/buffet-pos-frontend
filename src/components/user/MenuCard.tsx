import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image'

export default function MenuCard() {
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
                <div className = "flex flex-col h-full" >
                    <p className="text-2xl mt-[-12px] m-[-18px]">M1 Somtum</p>
                </div>
                <div className = "flex justify-end h-full items-end pr-1" >
                    <div className="flex flex-row items-center gap-4" >
                        <Icon icon="simple-line-icons:minus" fontSize={40} color='#FF8B13' />
                        <p className='text-2xl'>0</p>
                        <Icon icon="simple-line-icons:plus" fontSize={40} color = '#FF8B13' />
                    </div>
                </div>
            </div>
        </div>
    );
}