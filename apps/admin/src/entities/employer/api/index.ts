import { User } from "@entities/user/model/interfaces";
import { rootApi } from "@shared/api";

export const employerApi = rootApi.injectEndpoints({
    endpoints: build => ({
        getEmployerOwn: build.query<User, void>({
            query: () => ({
                url: '/user/employer',
                method: 'GET',
            }),
            providesTags: [{ type: 'employer', id: 'ME' }],
        }),
        getEmployerList: build.query<User[], void>({
            query: () => ({
                url: '/user/employer/list',
                method: 'GET',
            }),
            providesTags: ['employer_list'],
        })
    }),
})
