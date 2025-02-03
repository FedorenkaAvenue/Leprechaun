import { toast } from "react-toastify";

import { apiClient } from "@shared/api/client";

export async function resetServerCache(): Promise<void> {
    (await apiClient.delete('/adm/cache')).data;
    toast.success('Cache successfully cleared')
}
