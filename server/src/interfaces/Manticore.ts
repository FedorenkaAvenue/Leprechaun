import { TImageId } from './Image';
import { TLabelId } from './Label';
import { TPropertyGroupId, TPropertyID } from './Property';

export interface IProductIndexItem {
    created_at: string
    title: string
    price: number
    rating: number
    is_public: boolean
    is_available: boolean
    description: string

    label_id: TLabelId
    label_type: number
    lable_value: number

    img_id: TImageId
    img_src: string

    prop_id: TPropertyID
    prop_title: string
    prop_alt_name: string
    
    prop_gr_id: TPropertyGroupId
    prop_gr_title: string
    prop_gr_alt_name: string
    prop_gr_type: string
}
