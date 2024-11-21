import { UseQueryResult } from "@tanstack/react-query";

import { DashboardContent } from "@entities/dashboard/model/DashboardContent";
import { useProductHistory } from "@entities/history/api/hooks";
import { DashboardDTO } from "@entities/dashboard/model/dto";

export default function useContentTypeData(type: DashboardContent): UseQueryResult<DashboardDTO> {
    switch (type) {
        case DashboardContent.HISTORY:
            return useProductHistory();
        default:
            throw new Error('pizda..');
    }
}
