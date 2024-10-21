import { useParams } from 'react-router-dom';

import { useCategory } from '@entities/category/api/hooks';
import CategoryEntity from '@entities/category/ui/Category';

const Category = () => {
    const { url } = useParams();

    const { data } = useCategory(url as string);

    return (
        <div>
            widgets
            <CategoryEntity />
        </div>
    );
};

export default Category;
