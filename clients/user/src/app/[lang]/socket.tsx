"use client";

import { useEffect } from "react";

import { socket } from "@shared/configs/socket";
import { useUpdateProductHistory } from "@features/history/model/hooks";

export default function Socket() {
    const updateProductHistory = useUpdateProductHistory();

    useEffect(() => {
        socket.on('push_product_history', updateProductHistory);
    }, []);

    return null;
}
