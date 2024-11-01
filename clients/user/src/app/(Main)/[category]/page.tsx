import ProductCard from "@/components/entities/productCard";
import { getCategory, getProductListByCategory } from "./lib/api";
import { Pagination } from "@components/ui/pagination";

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
                        <ProductCard product={i} />
                    </li>
                ))}
            </ul>
            <Pagination pagination={products.pagination} />
        </div>
    )
}
