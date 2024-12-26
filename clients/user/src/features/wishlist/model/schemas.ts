import { z } from "zod";

import { TEXT_MAX_LENGTH, TEXT_MIN_LENGTH } from "@shared/constants/errors";
import { WISHLIST_TITLE_MIN_TEXT_LENGHT } from "../constants/schames";

export const createWishlistSchema = z.object({
    title: z
        .string()
        .min(WISHLIST_TITLE_MIN_TEXT_LENGHT, { message: TEXT_MIN_LENGTH })
        .max(50, { message: TEXT_MAX_LENGTH }),
    isDefault: z.boolean(),
});
