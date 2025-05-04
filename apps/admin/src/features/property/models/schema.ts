import { z } from "zod";

import { transSchema } from "@shared/models/schemas";

export const propertySchema = z.object({
    title: transSchema,
    alt_name: z.string().min(1, { message: 'Required' }),
    comment: z.string().optional(),
});
