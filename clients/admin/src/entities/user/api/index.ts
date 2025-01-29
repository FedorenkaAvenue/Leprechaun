import { apiClient } from "@shared/api";
import { AuthSuccessDTO, SignInUserDTO } from "./dto";

export async function signIn(body: SignInUserDTO): Promise<AuthSuccessDTO> {
    return await apiClient.postForm('/auth/signin', body);
}
