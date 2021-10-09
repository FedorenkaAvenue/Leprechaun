import { IProductIndexItem } from '@interfaces/Manticore';
import { IProduct } from '@interfaces/Product';
import { ICategory } from '@interfaces/Category';
import { IProperty } from '@interfaces/Property';
import { IImage } from '@interfaces/Image';
import { ILabel } from '@interfaces/Label';

/**
 * @description map Manticore product index to completed product
 */
export class ProductIndexDTO implements IProduct {
    id: string
    created_at: Date
    title: string
    is_public: boolean
    is_available: boolean
    rating: number
    price: number
    description: string
    images: Array<IImage>
    labels: Array<ILabel>
    category: ICategory
    properties: Array<IProperty>

    constructor({
        id, created_at, title, is_public, rating, price, description,
        cat_id, cat_url, cat_title, cat_is_public, cat_icon,
        img_id, img_src,
        label_id, label_type, lable_value,
        prop_id, prop_title, prop_alt_name,
        prop_gr_id, prop_gr_alt_name, prop_gr_title, prop_gr_type
    }: IProductIndexItem) {
        this.id = id;
        this.created_at = created_at;
        this.title = title;
        this.is_public = is_public;
        this.rating = rating;
        this.price = price;
        this.description = description;
        this.category = {
            id: cat_id,
            url: cat_url,
            title: cat_title,
            is_public: cat_is_public,
            icon: cat_icon
        };
        this.images = img_id ?
            [{ id: img_id, src: img_src }] :
            [];
        this.labels = label_id ?
            [{
                id: label_id,
                type: label_type,
                value: lable_value
            }] :
            [];
        this.properties = prop_id ?
            [{
                id: prop_id,
                title: prop_title,
                alt_name: prop_alt_name,
                property_group: {
                    id: prop_gr_id,
                    title: prop_gr_title,
                    type: prop_gr_type,
                    alt_name: prop_gr_alt_name
                }
            }] :
            [];
    }
}
