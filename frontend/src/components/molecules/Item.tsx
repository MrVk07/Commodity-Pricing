import { formatDateString } from "../../utils/formatDate";

export interface ItemDetail {
    Name: string;
    Image: string;
    Category: string;
    Costliest_Market: string;
    Costliest_Market_Price: string;
    Costliest_Market_State: string;
    Cheapest_Market: string;
    Cheapest_Market_Price: string;
    Cheapest_Market_State: string;
    Latest_Price_Date: Date;
}

interface ItemProps {
    item: ItemDetail,
}


const Item = (props: ItemProps) => {
    let { item } = props;
    let imagelink = item.Image.includes(".jpg.jpg")
        ? item.Image.replace(".jpg.jpg", ".jpg")
        : item.Image;
    return (
        <div className="border border-gray-300 rounded shadow-md h-full flex flex-col text-white">
            <img className="w-1/2 mt-2 mx-auto rounded" src={imagelink} alt={item.Name} />
            <div className="p-4">
                <h5 className="text-center font-bold text-lg"><strong>{item.Name}</strong></h5>
                <h6 className="text-center text-gray-500 font-semibold mb-2">Category:
                    <button className='ml-2 p-2 rounded bg-red-600 text-white border border-black'>
                        {item.Category}
                    </button>
                </h6>
                <p className="mb-2">Costliest Market: <strong>{item.Costliest_Market}</strong></p>
                <p className="mb-2">Costliest Market Price: <strong>{item.Costliest_Market_Price}</strong></p>
                <p className="mb-2">Cheapest Market: <strong>{item.Cheapest_Market}</strong></p>
                <p className="mb-2">Cheapest Market Price: <strong>{item.Cheapest_Market_Price}</strong></p>
                <p className="mb-2">Latest Price Date: <strong>{formatDateString(item.Latest_Price_Date)}</strong></p>
            </div>
        </div>
    );
}

export default Item