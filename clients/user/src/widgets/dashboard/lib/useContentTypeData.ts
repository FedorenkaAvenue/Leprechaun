import { useState } from "react";

import { DashboardContent } from "@entities/dashboard/model/DashboardContent";
import { useProductHistory } from "@entities/history/api/hooks";
import { ProductPreviewModel } from "@entities/product/models/Product";

interface Result {
    data: ProductPreviewModel[] | undefined
    isLoading: boolean
}

export default function useContentTypeData(type: DashboardContent): Result {
    switch (type) {
        case DashboardContent.HISTORY:
            return useProductHistory();
        default:
            throw new Error('pizda..');
    }
}
