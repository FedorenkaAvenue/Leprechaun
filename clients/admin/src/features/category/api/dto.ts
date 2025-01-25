import { z } from "zod";

import categorySchema from "../model/schema";

export type CategoryCreateDTO = z.infer<typeof categorySchema>;
export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;
