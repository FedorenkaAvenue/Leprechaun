import { apiClient } from "@shared/api/client";
import { AuthSuccessDTO, SignInUserDTO } from "./dto";

export async function signIn(body: SignInUserDTO): Promise<AuthSuccessDTO> {
    return await apiClient.postForm('/adm/auth/signin', body);
}

export async function refreshAccessToken(): Promise<AuthSuccessDTO> {
    return (await apiClient.get<AuthSuccessDTO>('/auth/refresh')).data;
}
