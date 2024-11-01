import TransSchema from '@shared/models/TransSchema';
import { z } from 'zod';

const PropertyGroupSchema = z.object({
    title: TransSchema,
    alt_name: z.string().min(1),
    is_primary: z.boolean().optional(),
    comment: z.string().optional(),
});


export type PropertyGroupSchemaT = z.infer<typeof PropertyGroupSchema>;
export default PropertyGroupSchema;
