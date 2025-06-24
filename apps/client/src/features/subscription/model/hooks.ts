import { useMutation, useQueryClient } from "@tanstack/react-query";

import { subscribeProductStatus } from "../api/api";
import { SubscribeProductStatusSchema } from "./schemas";
import { SUBSCRIBTION_PRODUCT_STATUS } from "@entities/subscribtion/constants/queryKeys";
import { useI18n } from "@shared/lib/i18n_client";
import { toast } from "@primitives/hooks/use-toast";
import { Product, ProductCardPublic } from "@gen/product";

export function useSubscribeProductStatus(productId: ProductCardPublic['id']) {
    const client = useQueryClient();
    const { dictionary } = useI18n();

    return useMutation({
        mutationFn: (form: SubscribeProductStatusSchema) => subscribeProductStatus({ ...form, productId }),
        onSuccess() {
            const subscribtions = client.getQueryData<Product['id'][]>([SUBSCRIBTION_PRODUCT_STATUS]);

            if (subscribtions) {
                client.setQueryData([SUBSCRIBTION_PRODUCT_STATUS], [...subscribtions, productId])
            } else {
                client.invalidateQueries({ queryKey: [SUBSCRIBTION_PRODUCT_STATUS] })
            }
        },
        onError(err) {
            if (err.message === '406') {
                toast({
                    description: dictionary?.subscriptions.emailAlreadySubscribedOnProduct,
                    variant: 'destructive',
                })
            }
        }
    })
}
