'use client'

import { createContext, FC, PropsWithChildren, useState } from 'react';
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';

import { CartModel } from './interfaces';
import { CART_QUERY } from '../constants/queryKeys';
import { getCart } from '../api';

export interface CartContext extends Partial<UseSuspenseQueryResult<CartModel | null, Error>> {
    isUpdating: boolean
    setUpdating: ((state: boolean) => void)
}

export const CartContext = createContext<CartContext>({ isUpdating: false, setUpdating: () => { } });

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isUpdating, setUpdating] = useState<boolean>(false);
    const query = useSuspenseQuery({ queryKey: [CART_QUERY], queryFn: getCart });

    return (
        <CartContext.Provider value={{ ...query, isUpdating, setUpdating }}>
            {children}
        </CartContext.Provider>
    )
}
