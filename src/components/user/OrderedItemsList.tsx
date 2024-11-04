import OrderedItems from "./OrderedItems";

export default function OrderedItemsList() {
    return (
        <div className="flex flex-col gap-2" >
            {[1, 2, 3, 4].map((item, index) => <OrderedItems key={index} />)}
        </div>
    );
}