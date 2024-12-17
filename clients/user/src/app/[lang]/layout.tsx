import { FC, PropsWithChildren } from "react";

import '../globals.css';
import { inter } from "@shared/lib/fonts";
import cn from "@shared/lib/cn";
import { getDictionary } from "@shared/lib/i18n_server";
import { I18nProvider } from "@shared/providers/i18n";
import QueryClientProvider from "@shared/providers/QueryClient";

interface Props {
    params: { lang: string }
}

const RootLayout: FC<PropsWithChildren<Props>> = async ({ params, children }) => {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
            <body className={cn('flex justify-center', inter.className)}>
                <I18nProvider dictionary={dict} lang={lang}>
                    <QueryClientProvider>
                        {children}
                    </QueryClientProvider>
                </I18nProvider>
            </body>
        </html>
    );
}

export default RootLayout;
