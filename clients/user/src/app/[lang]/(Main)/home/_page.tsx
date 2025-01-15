'use client';

import { DashboardContent } from '@entities/dashboard/model/enums';
import Dashboard from '@widgets/dashboard/ui/Dashboard';

const Home = () => {
    return (
        <section className='child:mb-5'>
            <Dashboard contentType={DashboardContent.HISTORY} />
        </section>
    )
}

export default Home;
