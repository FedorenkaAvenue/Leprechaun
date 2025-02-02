import { apiClient } from "@shared/api/client";
import { toast } from "react-toastify";

export async function resetServerCache(): Promise<void> {
    await apiClient.delete('/adm/cache');

    toast.success('Cache successfully cleared')
}
