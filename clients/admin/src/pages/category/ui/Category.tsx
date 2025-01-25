import { Button, Divider, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import CategoryEntity from "@entities/category/ui/Category";
import CategoryDeleteButton from "@features/category/ui/CategoryDeleteButton";
import Chip from "@shared/ui/Chip";
import ContentManager from "@shared/ui/ContentManager";
import Empty from "@shared/ui/Empty";
import TransList from "@shared/ui/TransList";
import routerSubConfig from '@shared/config/router';
import { PRODUCT_LIST_URL_QUERY_PARAMS } from "@features/product/constants/urlQueryParams";
import { useCategory } from "@entities/category/model/hooks";

const CategoryPage = () => {
    const nav = useNavigate();
    const { url } = useParams();
    const { data, isFetching } = useCategory(url as string);

    if (!data) return '...loading';

    return (
        <ContentManager
            isLoading={isFetching}
            tools={
                <>
                    <Button
                        onClick={() => nav(`${routerSubConfig.productCreate.path}?category=${data?.id}`)}
                        variant='contained'
                    >
                        Add product
                    </Button>
                    <Button onClick={() => alert("Хуя")} color='primary' variant='contained'>
                        Edit category
                    </Button>
                    <CategoryDeleteButton
                        withoutIcon
                        categoryId={data.id}
                        categoryUrl={data.url}
                        removeCallback={() => nav(routerSubConfig.categoryList.path)}
                    />
                </>
            }
        >
            <CategoryEntity
                category={data}
                renderPropertyGroups={groups => (
                    <>
                        <Divider />
                        <div className="flex flex-col gap-4">
                            <Typography variant='h5'>Property groups</Typography>
                            <Empty data={groups?.length}>
                                <ul className="flex flex-wrap gap-2">
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
                            </Empty>
                        </div>
                    </>
                )}
                renderProducts={products => (
                    <>
                        <Divider />
                        <div>
                            <Typography variant='h5'>Products</Typography>
                            <Empty data={products?.length}>
                                <Link
                                    to={`${routerSubConfig.productList.path}?${PRODUCT_LIST_URL_QUERY_PARAMS.category}=${data.url}`}
                                >
                                    There are&nbsp;
                                    <Typography component='span' color='primary'>
                                        {products?.length} products
                                    </Typography>
                                </Link>
                            </Empty>
                        </div>
                    </>
                )}
            />
        </ContentManager>
    );
};

export default CategoryPage;
