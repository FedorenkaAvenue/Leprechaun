import { z } from "zod";

const TransSchema = z.object({
    en: z.string().min(1, { message: 'Required' }),
    ru: z.string().min(1, { message: 'Required' }),
    ua: z.string().min(1, { message: 'Required' }),
});

export type TransSchemaT = z.infer<typeof TransSchema>;
export default TransSchema;
