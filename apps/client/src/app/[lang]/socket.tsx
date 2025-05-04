'use client';

import { useEffect } from 'react';

import { useUpdateProductHistory } from '@features/history/model/hooks';
import { Event } from '@shared/models/events';
import { socket } from '@shared/configs/socket';

export default function Socket() {
    const updateProductHistory = useUpdateProductHistory();

    useEffect(() => {
        socket.on(Event.HISTORY_PRODUCT_PUSH, updateProductHistory);
    }, []);

    return null;
}
