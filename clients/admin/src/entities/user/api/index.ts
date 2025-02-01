import { rootApi } from "@shared/api";
import { User } from "../model/interfaces";

export const userApi = rootApi.injectEndpoints({
    endpoints: build => ({
        getUser: build.query<User, void>({
            query: () => ({
                url: '/adm/user',
                method: 'GET',
            }),
            providesTags: ['user'],
        })
    }),
})
