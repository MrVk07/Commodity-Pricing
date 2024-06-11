import axios from "axios";

interface Cache {
    [key: string]: any;
}

const cache: Cache = {};

export const fetchData = async (category: string) => {
    try {
        if (category) {
            if (cache[category]) {
                return cache[category];
            }
            const response = await axios.get(`/api/category/${category}`);
            const data = response.data;
            cache[category] = data;
            return data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
