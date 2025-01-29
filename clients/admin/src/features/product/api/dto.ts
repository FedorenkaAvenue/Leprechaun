import { z } from "zod";

import { productSchema } from "../model/schema";

export type ProductCreateDTO = z.infer<typeof productSchema>
export type ProductUpdateDTO = Partial<ProductCreateDTO>
