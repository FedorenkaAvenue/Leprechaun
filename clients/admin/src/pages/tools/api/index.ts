import { apiClient } from "@shared/api/client";

export async function resetServerCache(): Promise<void> {
    return await apiClient.delete('/adm/cache');
}
