import '../../styles/globals.css';

import ClientProvider from '@providers/client';
import QueryProvider from '@providers/query';
import MainLayout from '@layouts/MainLayout';

export default function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <html>
            <head />
            <body>
                <ClientProvider>
                    <QueryProvider>
                        <MainLayout locale={params.locale} />
                        {children}
                    </QueryProvider>
                </ClientProvider>
            </body>
        </html>
    );
}
