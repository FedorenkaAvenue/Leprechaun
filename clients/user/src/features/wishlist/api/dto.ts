import { z } from "zod";

import { createWishlistSchema } from "../model/schemas";

export type CreateWishlistDTO = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistDTO = Partial<CreateWishlistDTO>;
