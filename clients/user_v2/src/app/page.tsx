import getCommonDashboards from '@api/dashboard/common';
import Dashboard from '@components/shared/Dashboard';

export default async function Page() {
    const { newest, popular } = await getCommonDashboards();

    return (
        <main>
            <Dashboard title="Newest" list={newest} />
            <Dashboard title="Popular" list={popular} />
        </main>
    );
}
