import { z } from 'zod';

import TransSchema from '@shared/models/TransSchema';
import ProductStatus from '@entities/product/model/ProductStatus';

const MAX_FILE_SIZE = 10000000;

const step1 = z.object({
    title: TransSchema,
    description: TransSchema,
    price_current: z.preprocess(val => {
        if (val === "") return;

        return typeof val === 'string' ? parseFloat(val) : val;
    }, z.number().positive().min(1)),
    price_old: z.preprocess(val => {
        if (val === "") return;

        return typeof val === 'string' ? parseFloat(val) : val;
    }, z.number().positive().optional()),
    is_public: z.boolean(),
    status: ProductStatus,
    rating: z.preprocess(val => {
        return typeof val === 'string' ? parseFloat(val) : val;
    }, z.number().positive().min(1).max(100)),
    is_new: z.boolean(),
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

const ProductSchema = z.object({ ...step1.shape, ...step2.shape, ...step3.shape });

export type ProductSchemaT = z.infer<typeof ProductSchema>;
export const ProductSchemaBySteps = [step1, step2, step3];
export default ProductSchema;
