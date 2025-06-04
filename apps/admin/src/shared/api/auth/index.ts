import { apiClient } from "@shared/api/client";
import { AuthSuccessDTO, SignInUserDTO } from "./dto";

export async function signIn(body: SignInUserDTO): Promise<AuthSuccessDTO> {
    return await apiClient.postForm<SignInUserDTO, AuthSuccessDTO>('/auth/signin', body);
}

export async function refreshAccessToken(): Promise<AuthSuccessDTO> {
    return (await apiClient.get<AuthSuccessDTO>('/auth/refresh')).data;
}

export async function signOut(): Promise<void> {
    return (await apiClient.get<void>('/auth/signout')).data;
}
