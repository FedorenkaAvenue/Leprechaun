import WishlistClient from './_page';

interface Props {
    params: Promise<{ id: string }>
}

export default async function Wishlist({ params }: Props) {
    const { id } = await params;

    return <WishlistClient wishlistId={id} />;
};
