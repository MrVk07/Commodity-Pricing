import { useCallback, useEffect, useState } from 'react';
import { fetchData } from '../../api/fetchData';
import { useParams } from 'react-router-dom';
import Loading from './loader/Loading';
import Item from '../molecules/Item';

const Category = () => {
    const { category } = useParams<{ category: string | undefined }>();
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        if (category) {
            setLoading(true);
            try {
                const response = await fetchData(category);
                setCategoryData(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
    }, [category]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className="container mx-auto px-4">
            {loading ? <Loading /> :
                <div className="flex flex-wrap justify-center">
                    {categoryData.map((item, i) => (
                        <div className="w-full md:w-1/3 p-3" key={i}>
                            <Item item={item} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Category;
