import { z } from "zod";

import { DictionaryModel } from "@shared/models/i18n";

export const SubscribeProductStatusSchema = z.object({
    email: z.
        string().
        min(1, { message: 'notEmpty' as keyof DictionaryModel['errors'] }).
        email('invalidEmail' as keyof DictionaryModel['errors']),
});

export type SubscribeProductStatusSchema = z.infer<typeof SubscribeProductStatusSchema>;
