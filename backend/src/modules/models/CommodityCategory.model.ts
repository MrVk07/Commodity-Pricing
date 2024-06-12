import mongoose from 'mongoose';
import { ICommodityCategory } from '../interfaces/CommodityItem';

const CommodityCategorySchema = new mongoose.Schema<ICommodityCategory>(
    {
        fetchDate: {
            type: Date,
            required: true,
            default: () => new Date(new Date().setHours(0, 0, 0, 0))
        },
        Name: { type: String, required: true },
        Items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommodityItem', required: true }],
    }, {
    timestamps: true
}
);

CommodityCategorySchema.index({ Name: 1, fetchDate: 1 }, { unique: true });

export const CommodityCategory = mongoose.model<ICommodityCategory>('CommodityCategory', CommodityCategorySchema);
export default CommodityCategory;
