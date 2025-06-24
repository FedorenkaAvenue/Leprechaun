import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCategoryCached, getCategoryListCached } from '@entities/category/api';
import { RouteProps } from '@shared/models/router';
import ProductCatalogueCard from '@widgets/product/ui/ProductCatalogueCard';
import Grid from '@shared/ui/Grid';
import interpolate from '@shared/lib/interpolate';
import { getDictionary } from '@shared/lib/i18n_server';
import ProductSortList from '@widgets/product/ui/ProductSortList';
import Pagination from '@shared/ui/Pagination';
import { getProductList } from '@entities/product/api';
import { CategoryPublic } from '@gen/category';
import { CategoryPreviewPublic } from '@gen/_category_preview';

type Props = RouteProps<{ category: string }, { page: string | undefined }>;

function getCatagory(
    categoryUrl: CategoryPublic['url'], categoryList: CategoryPreviewPublic[],
): CategoryPreviewPublic {
    const cat = categoryList.find(category => category.url === categoryUrl);

    if (!cat) notFound();

    return cat;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const categoryUrl = (await params).category;
    const { title } = getCatagory(categoryUrl, await getCategoryListCached());

    return { title };
}

export default async function Category({ params, searchParams }: Props) {
    const { category: categoryURL, lang } = await params;
    const queries = await searchParams;
    const category = getCatagory(categoryURL, await getCategoryListCached());
    const [categoryFullData, productlist, dictionary] = await Promise.all([
        getCategoryCached(category.id),
        getProductList({ ...queries, category: String(category.id) }),
        getDictionary(lang),
    ]);

    const productsAmount = productlist.pagination.totalCount;

    return (
        <section className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <div>
                    <h1>{categoryFullData.title}</h1>
                    <span>
                        {
                            interpolate(
                                productsAmount === 1
                                    ? dictionary.product.foundProductAmount
                                    : dictionary.product.foundProductsAmount,
                                [productlist.pagination.totalCount]
                            )
                        }
                    </span>
                </div>
                <div className='flex gap-2 items-center'>
                    <ProductSortList sort={queries.sort} />
                </div>
            </div>
            <Grid type='grid5' gap='l'>
                {productlist.data.map(i => (
                    <li key={i.id}>
                        <ProductCatalogueCard {...i} />
                    </li>
                ))}
            </Grid>
            <Pagination pagination={productlist.pagination} />
        </section>
    )
}
