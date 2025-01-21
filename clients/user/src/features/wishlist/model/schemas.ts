import { z } from 'zod';

import { WISHLIST_TITLE_MIN_TEXT_LENGHT } from '../constants/schames';
import { DictionaryModel } from '@shared/models/i18n';

export const createWishlistSchema = z.object({
    title: z
        .string()
        .min(WISHLIST_TITLE_MIN_TEXT_LENGHT, { message: 'notEmpty' as keyof DictionaryModel['errors'] })
        .max(50, { message: 'textMaxLength' as keyof DictionaryModel['errors'] }),
    isDefault: z.boolean(),
});
