import { Metadata } from 'next';

import { getDictionary } from '@shared/lib/i18n_server';
import { RouteProps } from '@shared/models/router';

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { profile } = await getDictionary((await params).lang);

    return {
        title: profile.profile,
    }
}

export default async function Profile() {
    return (
        <div>user</div>
    )
}
