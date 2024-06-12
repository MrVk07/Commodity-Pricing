import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from "cheerio"
import { ICommodityItem } from '../interfaces/CommodityItem';
import CommodityCategory from '../models/CommodityCategory.model';
import CommodityItem from '../models/CommodityItem.model';

export const scrapData = async (req: Request, res: Response) => {
    const category = req.params["category"];
    const validCategories = ['pulses', 'spices', 'oilseeds', 'cereals', 'fruits'];

    if (!validCategories.includes(category)) {
        return res.status(404).send('Category not found');
    }

    const existInDB = await CommodityCategory.findOne({ Name: category, fetchDate: { $gte: new Date().setHours(0, 0, 0, 0) } });
    if (existInDB) {
        const items = existInDB.Items;
        const dataItem = await CommodityItem.find({ _id: { $in: items } }, { _id: 0 });
        return res.send(dataItem);
    }

    const url = process.env.COMMODITY_PRICING_URL + "/" + category;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const dataItem: ICommodityItem[] = [];

    $(".boxContent").each((i, element) => {
        const itemName = $(element).find("h4").text().trim();
        const image = $(element).find(".lozad").attr("src");
        const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5_8U6-f_tDSw6t2z6AlyNfrDxSAQE8cPRMQ&usqp=CAU";
        const imageURL = image ? (image.includes("default") ? defaultImage : "https://www.commodityinsightsx.com" + image) : defaultImage;
        const marketData = $(element).find(".rc");

        const data_of_each_item: ICommodityItem = {
            Name: itemName,
            Image: imageURL,
            Category: category,
            Costliest_Market: $(marketData[2]).text().trim(),
            Costliest_Market_Price: $(marketData[3]).text().trim(),
            Cheapest_Market: $(marketData[4]).text().trim(),
            Cheapest_Market_Price: $(marketData[5]).text().trim(),
            Latest_Price_Date: new Date($(marketData[6]).text().trim())
        };

        dataItem.push(data_of_each_item);
    });

    const savedItems = await CommodityItem.create(dataItem);
    await CommodityCategory.create({
        Name: category,
        Items: savedItems.map(item => item._id),
        fetchDate: new Date().setHours(0, 0, 0, 0)
    });
    res.send(dataItem);
};
