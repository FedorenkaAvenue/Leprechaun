import { Metadata } from 'next';

import { getCategory, getProductListByCategory } from '@entities/category/api';
import { RouteProps } from '@shared/models/router';
import ProductCatalogueCard from '@widgets/product/ui/ProductCatalogueCard';
import Grid from '@shared/ui/Grid';
import interpolate from '@shared/lib/interpolate';
import { getDictionary } from '@shared/lib/i18n_server';
import ProductSortList from '@widgets/product/ui/ProductSortList';
import Pagination from '@shared/ui/Pagination';

type Props = RouteProps<{ category: string }, { page: string | undefined }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { title } = await getCategory((await params).category);

    return { title };
}

export default async function Category({ params, searchParams }: Props) {
    const { category: categoryURL, lang } = await params;
    const queries = await searchParams;
    const [category, products, dictionary] = await Promise.all([
        getCategory(categoryURL),
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
                <div>
                    <ProductSortList sort={queries.sort} />
                </div>
            </div>
            <Grid size='l'>
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
