import MenuCard from "./MenuCard";



export default function MenuCardList() {
    return(
        <div className = "flex flex-col gap-2 px-3 pt-16 pb-24">
            {[1,2,3,4,5,6,7,8,9,10].map((item,index) => <MenuCard key={index} />) }
        </div>
    );
}