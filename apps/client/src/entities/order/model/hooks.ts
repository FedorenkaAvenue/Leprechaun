import { useContext } from 'react';

import { CartContext } from './providers';

export function useCart() {
    return useContext(CartContext);
}
