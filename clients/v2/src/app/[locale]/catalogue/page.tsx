import getProducts from '@api/product/list';
import ProductCard from '@components/shared/ProductCard';

export default async function Catalogue({ params }: any) {
    const { data } = await getProducts();

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Catalogue</h1>
            <ul className="flex gap-5">
                {data.map(prod => (
                    <li key={prod.id}>
                        <ProductCard {...prod} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
