import apiClient from "@shared/api/client";
import { SignInUserDTO } from "./dto";

export async function signIn(body: SignInUserDTO) {
    return (await apiClient.postForm('/auth/signin', body)).data;
}
