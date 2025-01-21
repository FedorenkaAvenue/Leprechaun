import { useMutation, useQueryClient } from "@tanstack/react-query";

import { subscribeProductStatus } from "../api/api";
import { ProductCardModel } from "@entities/product/model/interfaces";
import { SubscribeProductStatusSchema } from "./schemas";
import { ProductStatusSubscriptionModel } from "@entities/subscribtion/model/interfaces";
import { SUBSCRIBTION_PRODUCT_STATUS } from "@entities/subscribtion/constants/queryKeys";
import { useI18n } from "@shared/lib/i18n_client";
import { toast } from "@primitives/hooks/use-toast";

export function useSubscribeProductStatus(productId: ProductCardModel['id']) {
    const client = useQueryClient();
    const { dictionary } = useI18n();

    return useMutation({
        mutationFn: (form: SubscribeProductStatusSchema) => subscribeProductStatus({ ...form, productId }),
        onSuccess() {
            const subscribtions = client.getQueryData<ProductStatusSubscriptionModel[]>([SUBSCRIBTION_PRODUCT_STATUS]);

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
