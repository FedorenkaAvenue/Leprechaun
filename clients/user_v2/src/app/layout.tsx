import { inter } from "@/fonts";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <div>Leprechaun</div>
                </header>
                {children}
            </body>
        </html>
    );
}
