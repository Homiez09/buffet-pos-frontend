import MenuCard from "./MenuCard";
import MenuConfirmCard from "./MenuConfirmCard";



export default function MenuConfirmCardList() {
    return(
        <div className="flex flex-col gap-2" >
            {[1,2,3,4,5,6,7,8,9,10].map((item,index) => <MenuConfirmCard key={index} />) }
        </div>
    );
}