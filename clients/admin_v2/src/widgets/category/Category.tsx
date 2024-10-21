import { useNavigate, useParams } from 'react-router-dom';

import { useCategory } from '@entities/category/api/hooks';
import CategoryEntity from '@entities/category/ui/Category';
import ContentManager from '@shared/ui/ContentManager';
import CategoryDeleteButton from '@features/category/ui/CategoryDeleteButton';
import routerSubConfig from '@shared/config/router';
import { Button } from '@mui/material';

const Category = () => {
    const nav = useNavigate();
    const { url } = useParams();

    const { data, isFetching } = useCategory(url as string);

    return (
        <ContentManager
            isLoading={isFetching}
            tools={
                <>
                    <Button onClick={() => alert("Хуя")} color='primary' variant='contained'>
                        Edit category
                    </Button>
                    <CategoryDeleteButton
                        withoutIcon
                        categoryId={data?.id}
                        categoryUrl={data?.url}
                        removeCallback={() => nav(routerSubConfig.categoryList.path)}
                    />
                </>
            }
        >
            <CategoryEntity category={data} />
        </ContentManager>
    );
};

export default Category;
