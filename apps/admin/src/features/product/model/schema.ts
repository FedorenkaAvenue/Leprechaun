import { z } from 'zod';

import { transSchema } from '@shared/models/schemas';
import { productStatusSchema } from '@entities/product/model/schemas';

const MAX_FILE_SIZE = 10000000;

const step1 = z.object({
    title: transSchema,
    description: transSchema,
    priceCurrent: z.preprocess(val => {
        if (val === "") return;

        return typeof val === 'string' ? parseFloat(val) : val;
    }, z.number().positive().min(1)),
    priceOld: z.preprocess(val => {
        if (val === "") return;

        return typeof val === 'string' ? parseFloat(val) : val;
    }, z.number().positive().optional()),
    isPublic: z.boolean(),
    status: productStatusSchema,
    rating: z.preprocess(val => {
        return typeof val === 'string' ? parseFloat(val) : val;
    }, z.number().positive().min(1).max(100)),
    isNew: z.boolean(),
    comment: z.string().optional(),
})
// .refine(
//     data => (data.price_old && data.price_old > data.price_current),
//     { path: ['price_old'], message: "Current price must be less than old price." },
// );

const step2 = z.object({
    category: z.number().nonnegative(),
    properties: z.array(z.number()),
});

const step3 = z.object({
    images: z
        .any()
    // .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
});

export const productSchema = z.object({ ...step1.shape, ...step2.shape, ...step3.shape });
export const productSchemaBySteps = [step1, step2, step3];
