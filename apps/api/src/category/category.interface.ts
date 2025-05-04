import { CategoryI } from '@core/category/category.interface';

export type CategoryPreviewI = Pick<CategoryI, 'id' | 'url' | 'title' | 'icon' | 'is_public' | 'comment' | 'created_at' | 'updated_at'>
