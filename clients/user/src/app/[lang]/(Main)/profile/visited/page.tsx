import { Metadata } from 'next';

import { getDictionary } from '@shared/lib/i18n_server';
import { RouteProps } from '@shared/models/router';
import VisitedClient from './_page';
import HistoryClearProducts from '@features/history/ui/HistoryClearProducts';

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { history } = await getDictionary((await params).lang);

    return {
        title: history.visitedProducts,
    }
}

export default async function Visited({ params }: RouteProps) {
    const { history } = await getDictionary((await params).lang);

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <h1>{history.visitedProducts}</h1>
                <HistoryClearProducts />
            </div>
            <VisitedClient />
        </div>
    )
}
