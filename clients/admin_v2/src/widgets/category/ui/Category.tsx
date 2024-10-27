import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Typography } from '@mui/material';

import { useCategory } from '@entities/category/api/hooks';
import Category from '@entities/category/ui/Category';
import ContentManager from '@shared/ui/ContentManager';
import CategoryDeleteButton from '@features/category/ui/CategoryDeleteButton';
import routerSubConfig from '@shared/config/router';
import Chip from '@shared/ui/Chip';
import TransList from '@shared/ui/TransList';

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
            <Category
                category={data}
                renderPropertyGroups={groups => (
                    <>
                        <Divider />
                        <div className="flex flex-col gap-4">
                            <Typography variant='h5'>Property groups</Typography>
                            <ul className="flex gap-2">
                                {groups?.map(i => (
                                    <li key={i.id}>
                                        <Chip
                                            link={`${routerSubConfig.propertyGroupList.path}/${i.id}`}
                                            tooltip={<TransList data={i.title} />}
                                            label={i.alt_name}
                                            tooltipProps={{ placement: 'bottom' }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            />
        </ContentManager>
    );
};

export default CategoryWidget;
