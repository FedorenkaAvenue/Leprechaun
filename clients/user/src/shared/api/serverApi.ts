'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { SERVER_DOMAIN_API } from '../constants/api';

const serverAPI = axios.create({ baseURL: SERVER_DOMAIN_API });

serverAPI.interceptors.request.use(
    async conf => {
        const cookieStore = await cookies();

        conf.headers.set('cookie', `session=${cookieStore.get('session')?.value}`);
        conf.params = {
            lang: cookieStore.get('lang')?.value,
            ...conf.params,
            // portion: cookieStore.get('portion')?.value,
        };

        return conf;
    }
);

serverAPI.interceptors.response.use(
    async response => {
        const cookie = response.headers['set-cookie'];

        if (cookie) {
            const [cookieName, cookieValue] = cookie[0].split(';')[0].split('=');
            const cookieStore = await cookies();

            cookieStore.set(cookieName, cookieValue, { httpOnly: true, domain: '.leprechaun.loc' });
        }

        return response;
    },
    error => {
        switch (error.response?.status) {
            case 404:
                notFound();
            case 401:
                console.log('Unauthorized user');
                break;
        }

        throw new Error(error.response?.status);
    }
);

export default serverAPI;
