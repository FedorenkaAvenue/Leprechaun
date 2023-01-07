'use client';

import { UserSchema } from '@schemas/User';

// import getUser from "@api/user/init";
// import { useQuery } from "@tanstack/react-query";
import { useContext } from 'react';
import { ClientContext } from '@providers/client';

export default function Wishlist() {
    // const { isFetching, data } = useQuery({ queryKey: ['user'], queryFn: getUser });
    const client = useContext(ClientContext);

    return (
        <div>
            wishlist
            {/* { isFetching ? 'loading...' : (data as UserSchema).session } */}
        </div>
    );
}
