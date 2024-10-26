import { z } from 'zod';

import TransSchema from '@shared/models/TransSchema';

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = ["image/svg+xml"];

const CategorySchema = z.object({
    url: z.string().min(1),
    title: TransSchema,
    is_public: z.boolean(),
    icon: z.any()
        .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .svg formats is supported."
        ),
    propertygroups: z.number().array(),
    comment: z.string().optional(),
});

export type CategorySchemaT = z.infer<typeof CategorySchema>;
export default CategorySchema;
