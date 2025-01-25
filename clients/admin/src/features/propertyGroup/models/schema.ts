import { z } from 'zod';

import { transSchema } from '@shared/models/schemas';

const propertyGroupSchema = z.object({
    title: transSchema,
    alt_name: z.string().min(1),
    is_primary: z.boolean().optional(),
    comment: z.string().optional(),
});

export default propertyGroupSchema;
