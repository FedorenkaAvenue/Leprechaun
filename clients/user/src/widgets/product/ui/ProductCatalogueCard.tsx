import { FC } from 'react';

import { ProductCardModel } from '@entities/product/model/interfaces';
import { ProductCard } from '@entities/product/ui/ProductCards';
import CartAddItem from '@features/order/ui/CartAddItem';
import AppLink from '@shared/ui/AppLink';
import WishlistItemAdd from '../../wishlist/ui/WishlistItemAdd';
import { ProductStatusModel } from '@entities/product/model/enums';
import SubscribeProductStatus from '@features/subscription/ui/ProductStatusSubscribe';

type Props = ProductCardModel;

const ProductCatalogueCard: FC<Props> = item => {
    return (
        <ProductCard
            product={item}
            renderBottomOptions={product => (
                <>
                    <WishlistItemAdd productId={product.id} />
                    {
                        item.status === ProductStatusModel.AVAILABLE
                            ? <CartAddItem productId={product.id} />
                            : <SubscribeProductStatus productId={item.id} />
                    }
                </>
            )}
            renderAdditionalData={product => (
                !!product.options.length && (
                    <div>
                        <div className='text-secondary-foreground'>{product.description}</div>
                        <ul>
                            {product.options.map(({ id, title, properties }) => (
                                <li key={id}>
                                    <span>{title}</span>:&nbsp;
                                    {properties.map(p => (
                                        <span key={p.id}><AppLink href='' withAction>{p.title}</AppLink></span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        />
    );
};

export default ProductCatalogueCard;
