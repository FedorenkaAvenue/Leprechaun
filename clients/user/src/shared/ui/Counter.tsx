'use client';

import { FC, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

import { Button } from './primitives/ui/button';

interface Props {
    amount: number
    handleChange: (amount: number) => void
}

const Counter: FC<Props> = ({ amount, handleChange }) => {
    const [state, setState] = useState(amount);
    const debaucedValue = useDebounce(state, 500);

    useEffect(() => {
        if (amount !== debaucedValue) handleChange(debaucedValue);
    }, [debaucedValue])

    return (
        <div className='flex gap-2 items-center'>
            <Button disabled={state < 2} onClick={() => setState(state - 1)}>-</Button>
            <span>{state}</span>
            <Button onClick={() => setState(state + 1)}>+</Button>
        </div>
    );
};

export default Counter;
