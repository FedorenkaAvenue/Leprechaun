import { Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { ReactNode } from "react";
import { PhotoProvider } from "react-photo-view";

import Chip from "@shared/ui/Chip";
import TransList from "@shared/ui/TransList";
import Image from "@shared/ui/Image";
import Empty from "@shared/ui/Empty";
import { Product } from "@gen/product";

interface Props {
    product: Product
    aditionalContent?: ReactNode
}

const ProductEntity = ({ product, aditionalContent }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                    <div className="flex-1">
                        <div>id: <b>{product.id}</b></div>
                        <div>created at: <b>{new Date(product.createdAt).toLocaleString()}</b></div>
                        <div>comment: <b>{product.comment}</b></div>
                        <div>is public: <b>{product.isPublic ? 'yes' : 'no'}</b></div>
                        <div>is new: <b>{product.isNew ? 'yes' : 'no'}</b></div>
                        <div>status: <b>{product.status}</b></div>
                        <div>rating: <b>{product.rating}</b></div>
                    </div>
                    <div>
                        price:
                        <div>current: <b>{product.price.current}</b></div>
                        <div>old: <b>{product.price.old}</b></div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-1">
                        title:
                        <ul>
                            <li><b>{product.title.en}</b></li>
                            <li><b>{product.title.ua}</b></li>
                            <li><b>{product.title.ru}</b></li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        description:
                        <ul>
                            <li><b>{product.description.en}</b></li>
                            <li><b>{product.description.ua}</b></li>
                            <li><b>{product.description.ru}</b></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Divider />
            {
                aditionalContent
                && (
                    <>
                        <div>
                            {aditionalContent}
                        </div>
                        <Divider />
                    </>
                )
            }
            <div className="flex flex-col gap-2">
                <Typography variant='h5'>Properties</Typography>
                <Empty data={product.options.length}>
                    <ul className="flex flex-col gap-2">
                        {product.options.map(o => (
                            <li key={o.id} className="flex gap-4">
                                <Typography>{o.altName}</Typography>
                                <ul>
                                    {o.properties.map(p => (
                                        <li key={p.id}>
                                            <Chip label={p.altName} tooltip={<TransList data={p.title} />} />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Empty>
            </div>
            <Divider />
            <div>
                <Typography variant='h5'>Images</Typography>
                {
                    product.images
                        ? (
                            <PhotoProvider>
                                <ImageList variant='masonry' cols={5} gap={16}>
                                    {product.images.map(({ id, src }) => (
                                        <ImageListItem key={id}>
                                            <Image src={src} withSlider />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </PhotoProvider>
                        )
                        : <div>empty</div>
                }
            </div>
        </div>
    );
};

export default ProductEntity;
