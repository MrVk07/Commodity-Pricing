import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import axios from 'axios';
import cheerio from "cheerio"

interface DataItem {
    Name: string;
    Image: string;
    Category: string;
    Costliest_Market: string;
    Costliest_Market_Price: string;
    Cheapest_Market: string;
    Cheapest_Market_Price: string;
    Latest_Price_Date: string;
}

export const scrapData = catchAsync(async (req: Request, res: Response) => {
    const category = req.params["category"];
    const validCategories = ['pulses', 'spices', 'oilseeds', 'cereals', 'fruits'];
    if (!validCategories.includes(category)) {
        return res.status(404).send('Category not found');
    }
    const url = process.env.COMMODITY_PRICING_URL + "/" + category;
    const response = await axios.get(url);
    const html = response.data;
    let dataItem: DataItem[] = [];
    let $ = cheerio.load(html)
    let itemArr = $(".boxContent")
    let Item_name = $('.boxContent>h4')
    let images = $('.lozad')
    let table_of_content_value = $(".rc")
    for (let i = 0; i < itemArr.length; i++) {
        let data_of_each_item = {
            Name: $(Item_name[i]).text().trim(),
            Image: images[i].attributes[1].value.includes("default")
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5_8U6-f_tDSw6t2z6AlyNfrDxSAQE8cPRMQ&usqp=CAU"
                : "https://www.commodityinsightsx.com" + images[i].attributes[1].value,
            Category: category,
            Costliest_Market: $(table_of_content_value[7 * i + 2]).text().trim(),
            Costliest_Market_Price: $(table_of_content_value[7 * i + 3]).text().trim(),
            Cheapest_Market: $(table_of_content_value[7 * i + 4]).text().trim(),
            Cheapest_Market_Price: $(table_of_content_value[7 * i + 5]).text().trim(),
            Latest_Price_Date: $(table_of_content_value[7 * i + 6]).text().trim()
        }
        dataItem.push(data_of_each_item);
    }
    res.send(dataItem);
});
