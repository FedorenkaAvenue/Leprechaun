import { Metadata } from 'next';

import HomeClient from './_page';

export default async function Home() {
    return (
        <div>
            <HomeClient />
        </div>
    );
}
