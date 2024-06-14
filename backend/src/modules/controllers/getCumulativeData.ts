import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import CommodityItem from '../models/CommodityItem.model';
import { getPlaceDetails } from '../../utils/getPlaceDetails';

export const getCumulativeDataByItem = catchAsync(async (req: Request, res: Response) => {
    const { item } = req.params;
    const data = await CommodityItem.find({ Name: item });
    const costliestMarketPrices = data.map(d => ({
        Date: d.Latest_Price_Date,
        Price: d.Costliest_Market_Price
    })).sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    const cheapestMarketPrices = data.map(d => ({
        Date: d.Latest_Price_Date,
        Price: d.Cheapest_Market_Price
    })).sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    const result = {
        Name: data[0].Name,
        Image: data[0].Image,
        Costliest_market_price: costliestMarketPrices,
        Cheapest_market_price: cheapestMarketPrices
    };

    return res.send(result);
});

export const getCumulativeDataByPlace = catchAsync(async (req: Request, res: Response) => {
    const { place } = req.params;
    const state = await getPlaceDetails(place);
    const allItems = await CommodityItem.find({
        $or: [
            { Cheapest_Market_State: state },
            { Costliest_Market_State: state }
        ]
    }, { Name: 1, _id: 0 });
    if (allItems.length < 1) return res.send("No Items available for specified place");
    return res.send(allItems);
});
