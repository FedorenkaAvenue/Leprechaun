import { z } from 'zod';

import { transSchema } from '@shared/models/schemas';

const PropertyGroupSchema = z.object({
    title: transSchema,
    alt_name: z.string().min(1),
    is_primary: z.boolean().optional(),
    comment: z.string().optional(),
});


export type PropertyGroupSchemaT = z.infer<typeof PropertyGroupSchema>;
export default PropertyGroupSchema;
