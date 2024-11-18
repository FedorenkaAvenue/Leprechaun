import axios from "axios";
import { cookies } from "next/headers";

const serverAPI = axios.create({ baseURL: process.env.DOMAIN_API });

serverAPI.interceptors.request.use(
    async (conf) => {
        const cookieStore = await cookies();
        const session = cookieStore.get('session');

        conf.headers.set('cookie', `session=${session?.value}`);

        return conf;
    }
);

export default serverAPI;
