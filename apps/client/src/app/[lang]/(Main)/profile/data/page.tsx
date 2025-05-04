import { Metadata } from "next";

import { getDictionary } from "@shared/lib/i18n_server";
import { RouteProps } from "@shared/models/router";

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { profile } = await getDictionary((await params).lang);

    return {
        title: profile.personalData,
    }
}

export default async function Data() {
    return (
        <section>personal data TODO</section>
    )
}
