import { z } from 'zod';

import { transSchema } from '@shared/models/schemas';

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = ["image/svg+xml"];

export const categorySchema = z.object({
    url: z.string().min(1),
    title: transSchema,
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
