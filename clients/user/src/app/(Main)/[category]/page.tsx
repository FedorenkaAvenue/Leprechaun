import { getCategory, getProductListByCategory } from "@entities/category/api";
import { Pagination } from "@shared/ui/pagination";
import ProductCatalogueCard from "@widgets/product/ui/ProductCatalogueCard";

interface Props {
    params: Promise<{ category: string }>
    searchParams: Promise<{ page: string | undefined }>
}

export default async function Category({ params, searchParams }: Props) {
    const { category: categoryURL } = await params;
    const { page } = await searchParams;
    const category = await getCategory(categoryURL);
    const products = await getProductListByCategory(categoryURL, page);

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
            <Pagination pagination={products.pagination} />
        </div>
    )
}
