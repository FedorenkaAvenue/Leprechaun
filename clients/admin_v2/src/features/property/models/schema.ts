import { z } from "zod";

import transSchemaValidation from "@shared/models/TransSchema";

const PropertySchema = z.object({
    title: transSchemaValidation,
    alt_name: z.string().min(1, { message: 'Required' }),
    comment: z.string().optional(),
});

export type PropertySchemaT = z.infer<typeof PropertySchema>;
export default PropertySchema;
