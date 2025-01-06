"use client";

import { io } from "socket.io-client";

import { CLIENT_DOMAIN_API } from "../constants/api";

export const socket = io(
    // CLIENT_DOMAIN_API + '/socket/',
    'http://localhost:9999/user',
    { transports: ['websocket'], withCredentials: true },
);
