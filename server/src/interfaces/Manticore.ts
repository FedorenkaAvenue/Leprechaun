import { ICategory } from './Category';
import { IImage } from './Image';
import { ILabel } from './Label';
import { IProduct } from './Product';
import { IProperty, IPropertyGroup } from './Property';

export interface IProductIndexItem {
    id: IProduct['id']
    created_at: IProduct['created_at']
    title: IProduct['title']
    price: IProduct['price']
    rating: IProduct['rating']
    is_public: IProduct['is_public']
    is_available: IProduct['is_available']
    description: IProduct['description']

    label_id: ILabel['id']
    label_type: ILabel['type']
    lable_value: ILabel['value']

    img_id: IImage['id']
    img_src: IImage['src']

    prop_id: IProperty['id']
    prop_title: IProperty['title']
    prop_alt_name: IProperty['alt_name']

    prop_gr_id: IPropertyGroup['id']
    prop_gr_title: IPropertyGroup['title']
    prop_gr_alt_name: IPropertyGroup['alt_name']
    prop_gr_type: IPropertyGroup['type']

    cat_id: ICategory['id']
    cat_url: ICategory['url']
    cat_title: ICategory['title']
    cat_is_public: ICategory['is_public']
    cat_icon: ICategory['icon']
}
