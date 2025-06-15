import { z } from "zod";

import { ProductStatus } from "@gen/product";

export const productStatusSchema = z.nativeEnum(ProductStatus);

export type ProductStatusSchema = z.infer<typeof productStatusSchema>;
