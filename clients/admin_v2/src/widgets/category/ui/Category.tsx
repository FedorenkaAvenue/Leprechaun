import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { useCategory } from '@entities/category/api/hooks';
import Category from '@entities/category/ui/Category';
import ContentManager from '@shared/ui/ContentManager';
import CategoryDeleteButton from '@features/category/ui/CategoryDeleteButton';
import routerSubConfig from '@shared/config/router';

const CategoryWidget = () => {
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
            <Category category={data} />
        </ContentManager>
    );
};

export default CategoryWidget;
