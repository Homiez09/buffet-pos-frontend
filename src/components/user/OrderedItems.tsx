import MenuCompleteCardList from "./MenuCompleteCardList";


export default function OrderedItems() {
    return (
        <div className="border-b-2 mx-auto pb-2 w-11/12">
            <p className="text-lg ml-6 font-bold"> เวลา : 12:08 </p>
            <div className="p-3 ">
                <MenuCompleteCardList />
            </div>
        </div>
    );
}