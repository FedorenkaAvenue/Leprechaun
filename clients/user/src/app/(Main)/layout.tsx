import { inter } from "@/fonts";
import Link from "next/link";

import '../../globals.css';
import { getCategoryList } from "./lib/api";
import { cn } from "@lib/utils";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const categoryList = await getCategoryList();

    return (
        <html lang="en">
            <body className={cn('flex justify-center', inter.className)}>
                <div className="w-[1200px] flex flex-col gap-4 my-4">
                    <header className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <Link href="/">Leprechaun</Link>
                            <input />
                            <ul className="flex gap-2">
                                <li>fav</li>
                                <li>cart</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="flex gap-4">
                                {categoryList.map(i => (
                                    <li key={i.id}>
                                        <Link href={i.url}>{i.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </header>
                    {children}
                </div>
            </body>
        </html>
    );
}
