import axios from "axios";
import { cookies } from "next/headers";

import { DEFAULT_LANG } from "@shared/constants/i18n_server";

const serverAPI = axios.create({ baseURL: process.env.DOMAIN_API });

serverAPI.interceptors.request.use(
    async conf => {
        const cookieStore = await cookies();
        const session = cookieStore.get('session');
        const lang = cookieStore.get('lang');

        conf.headers.set('cookie', `session=${session?.value}`);
        conf.params = {
            lang: lang?.value || DEFAULT_LANG,
            portion: 10,
        };

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
