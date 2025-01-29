import { apiClient } from "@shared/api";

export async function resetServerCache(): Promise<void> {
    return await apiClient.delete('/adm/cache');
}
