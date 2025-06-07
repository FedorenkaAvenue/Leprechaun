import { z } from 'zod';

import { transSchema } from '@shared/models/schemas';

export const propertyGroupSchema = z.object({
    title: transSchema,
    altName: z.string().min(1),
    isPrimary: z.boolean().optional(),
    comment: z.string().optional(),
});
