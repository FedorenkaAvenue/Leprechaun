import { Metadata } from "next";

import { getCategory, getProductListByCategory } from "@entities/category/api";
import { RouteProps } from "@shared/models/router";
import ProductCatalogueCard from "@widgets/product/ui/ProductCatalogueCard";
import { PaginationWrapper } from "@primitives/ui/pagination";

type Props = RouteProps<{ category: string }, { page: string | undefined }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { title } = await getCategory((await params).category);

    return { title };
}

export default async function Category({ params, searchParams }: Props) {
    const { category: categoryURL } = await params;
    const { page } = await searchParams;

    const [category, products] = await Promise.all([
        getCategory(categoryURL),
        getProductListByCategory(categoryURL, page),
    ]);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="inline">{category.title}</h2>
                <span>{products.pagination.totalCount} items</span>
            </div>
            <ul className="grid grid-cols-5 gap-2">
                {products.data.map(i => (
                    <li key={i.id}>
                        <ProductCatalogueCard {...i} />
                    </li>
                ))}
            </ul>
            <PaginationWrapper pagination={products.pagination} />
        </div>
    )
}
