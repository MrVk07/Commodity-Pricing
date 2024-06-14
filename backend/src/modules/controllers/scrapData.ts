import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import axios from 'axios';
import cheerio from "cheerio"
import CommodityCategory from '../models/CommodityCategory.model';
import CommodityItem from '../models/CommodityItem.model';
import { getPlaceDetails } from '../../utils/getPlaceDetails';
import { ICommodityItem } from '../interfaces/Commodity';

export const scrapData = catchAsync(async (req: Request, res: Response) => {
    const category = req.params["category"];
    const validCategories = ['pulses', 'spices', 'oilseeds', 'cereals', 'fruits'];
    if (!validCategories.includes(category)) {
        return res.status(404).send('Category not found');
    }
    const existInDB = await CommodityCategory.findOne({ Name: category, fetchDate: new Date().setHours(0, 0, 0, 0) });
    if (existInDB) {
        const items = existInDB.Items;
        const dataItem = await CommodityItem.find({ _id: { $in: items } }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }).lean();
        return res.send(dataItem);
    }

    const url = process.env.COMMODITY_PRICING_URL + "/" + category;
    const response = await axios.get(url);
    const html = response.data;
    let dataItem: ICommodityItem[] = [];
    let $ = cheerio.load(html)
    let itemArr = $(".boxContent")
    let Item_name = $('.boxContent>h4')
    let images = $('.lozad')
    let table_of_content_value = $(".rc")
    let savedItems = [];
    for (let i = 0; i < itemArr.length; i++) {
        let data_of_each_item: ICommodityItem = {
            Name: $(Item_name[i]).text().trim(),
            Image: images[i].attributes[1].value.includes("default")
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5_8U6-f_tDSw6t2z6AlyNfrDxSAQE8cPRMQ&usqp=CAU"
                : "https://www.commodityinsightsx.com" + images[i].attributes[1].value,
            Category: category,
            Costliest_Market: $(table_of_content_value[7 * i + 2]).text().trim(),
            Costliest_Market_Price: $(table_of_content_value[7 * i + 3]).text().trim(),
            Costliest_Market_State: "",
            Cheapest_Market: $(table_of_content_value[7 * i + 4]).text().trim(),
            Cheapest_Market_Price: $(table_of_content_value[7 * i + 5]).text().trim(),
            Cheapest_Market_State: "",
            Latest_Price_Date: new Date($(table_of_content_value[7 * i + 6]).text().trim())
        }
        data_of_each_item.Costliest_Market_State = await getPlaceDetails(data_of_each_item.Costliest_Market);
        data_of_each_item.Cheapest_Market_State = await getPlaceDetails(data_of_each_item.Cheapest_Market);
        try {
            const itemExistInDB = await CommodityItem.findOne({ Name: data_of_each_item.Name, Latest_Price_Date: data_of_each_item.Latest_Price_Date });
            if (itemExistInDB) {
                savedItems.push(itemExistInDB);
            }
            else {
                const newItem = await CommodityItem.create(data_of_each_item);
                savedItems.push(newItem);
            }
        } catch (error) {
            console.log(error);
        }

        dataItem.push(data_of_each_item);
    }

    await CommodityCategory.create({
        Name: category,
        Items: savedItems.map(item => item._id)
    });
    res.send(dataItem);
});
