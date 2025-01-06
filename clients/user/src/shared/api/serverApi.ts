import axios from "axios";
import { cookies } from "next/headers";

import { SERVER_DOMAIN_API } from "../constants/api";

const serverAPI = axios.create({ baseURL: SERVER_DOMAIN_API });

serverAPI.interceptors.request.use(
    async conf => {
        const cookieStore = await cookies();

        conf.headers.set('cookie', `session=${cookieStore.get('session')?.value}`);
        conf.params = {
            lang: cookieStore.get('lang')?.value,
            portion: cookieStore.get('portion')?.value,
        };
        conf.fetchOptions = { next: { revalidate: 60 }, };

        return conf;
    }
);

serverAPI.interceptors.response.use(
    response => response,
    error => {
        console.log(error.toJSON());

        throw error;
    }
);

export default serverAPI;
