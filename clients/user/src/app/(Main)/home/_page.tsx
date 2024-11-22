'use client';

import { DashboardContent } from "@entities/dashboard/model/DashboardContent";
import Dashboard from "@widgets/dashboard/ui/Dashboard";

const Home = () => {
    return (
        <div className='child:mb-5'>
            <Dashboard contentType={DashboardContent.HISTORY} />
        </div>
    )
}

export default Home;
