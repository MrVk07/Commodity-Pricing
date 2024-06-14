import mongoose from 'mongoose';
import { IPlace } from '../interfaces/Place';

const PlaceSchema = new mongoose.Schema<IPlace>(
    {
        Name: { type: String, required: true },
        State: { type: String, required: true }
    }, {
    timestamps: true
}
);

PlaceSchema.index({ Name: 1, fetchDate: 1 }, { unique: true });

export const Place = mongoose.model<IPlace>('Place', PlaceSchema);
export default Place;
