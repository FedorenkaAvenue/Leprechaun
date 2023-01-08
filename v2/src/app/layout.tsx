import '../styles/globals.css';

import QueryProvider from '@providers/query';
import MainLayout from '@layouts/MainLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head />
            <body>
                <QueryProvider>
                    <MainLayout />
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}
