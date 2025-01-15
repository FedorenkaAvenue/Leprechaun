'use client';

import { io } from 'socket.io-client';

import { CLIENT_DOMAIN_API } from '../constants/api';

export const socket = io(
    `${CLIENT_DOMAIN_API}/user`,
    {
        transports: ['websocket'],
        withCredentials: true,
    },
);
