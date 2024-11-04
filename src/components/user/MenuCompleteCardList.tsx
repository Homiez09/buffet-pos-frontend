import MenuCard from "./MenuCard";
import MenuConfirmCard from "./MenuCompleteCard";


export default function MenuCompleteCardList() {
    return(
        <div className="flex flex-col gap-3" >
            {[1,2,3].map((item,index) => <MenuConfirmCard key={index} />) }
        </div>
    );
}