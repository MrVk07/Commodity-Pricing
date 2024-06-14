import axios from "axios";
import Place from "../modules/models/Place";

export const getPlaceDetails = async (placeName: string) => {
    let place = await Place.findOne({ Name: placeName });
    if (place) {
        return place.State;
    }
    const apiEndpoint = process.env.PLACE_DETAILS_API;
    if (!apiEndpoint) {
        throw new Error("API endpoint is not defined in the environment variables.");
    }

    const url = `${apiEndpoint}/search`;
    try {
        const { data } = (await axios.get(url, {
            params: {
                q: placeName,
                format: 'json',
                addressdetails: 1,
                limit: 1
            }
        }));
        if (data.length > 0) {
            const state = data[0].address.state;
            await Place.create({ Name: placeName, State: state });
            return state;
        } else {
            return "No results found for the specified place.";
        }
    } catch (error) {
        console.error(`Error: Unable to fetch data (${error})`);
        throw new Error(`Error fetching data: ${error}`);
    }
};
