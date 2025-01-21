import { Metadata } from 'next';
import { cache } from 'react';

import { getCategory, getProductListByCategory } from '@entities/category/api';
import { RouteProps } from '@shared/models/router';
import ProductCatalogueCard from '@widgets/product/ui/ProductCatalogueCard';
import Grid from '@shared/ui/Grid';
import interpolate from '@shared/lib/interpolate';
import { getDictionary } from '@shared/lib/i18n_server';
import ProductSortList from '@widgets/product/ui/ProductSortList';
import Pagination from '@shared/ui/Pagination';

type Props = RouteProps<{ category: string }, { page: string | undefined }>;

const getCategoryCached = cache(getCategory);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { title } = await getCategoryCached((await params).category);

    return { title };
}

export default async function Category({ params, searchParams }: Props) {
    const { category: categoryURL, lang } = await params;
    const queries = await searchParams;
    const [category, products, dictionary] = await Promise.all([
        getCategoryCached(categoryURL),
        getProductListByCategory(categoryURL, queries),
        getDictionary(lang),
    ]);

    const productsAmount = products.pagination.totalCount;

    return (
        <section className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <div>
                    <h1>{category.title}</h1>
                    <span>
                        {
                            interpolate(
                                productsAmount === 1
                                    ? dictionary.product.foundProductAmount
                                    : dictionary.product.foundProductsAmount,
                                [products.pagination.totalCount]
                            )
                        }
                    </span>
                </div>
                <div className='flex gap-2 items-center'>
                    <ProductSortList sort={queries.sort} />
                </div>
            </div>
            <Grid type='grid5' gap='l'>
                {products.data.map(i => (
                    <li key={i.id}>
                        <ProductCatalogueCard {...i} />
                    </li>
                ))}
            </Grid>
            <Pagination pagination={products.pagination} />
        </section>
    )
}
