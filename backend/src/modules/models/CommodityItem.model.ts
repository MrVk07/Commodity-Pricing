import mongoose from 'mongoose';
import { ICommodityItem } from '../interfaces/CommodityItem';

const CommodityItemSchema = new mongoose.Schema<ICommodityItem>(
    {
        Name: { type: String, required: true },
        Image: { type: String, required: true },
        Category: { type: String, required: true },
        Costliest_Market: { type: String, required: true },
        Costliest_Market_Price: { type: String, required: true },
        Cheapest_Market: { type: String, required: true },
        Cheapest_Market_Price: { type: String, required: true },
        Latest_Price_Date: { type: Date, required: true }
    }, {
    timestamps: true
}
);

CommodityItemSchema.index({ name: 1, Latest_Price_Date: 1 }, { unique: true });

export const CommodityItem = mongoose.model<ICommodityItem>('CommodityItem', CommodityItemSchema);
export default CommodityItem;
