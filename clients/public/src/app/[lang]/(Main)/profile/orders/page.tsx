import { Metadata } from "next";

import { getDictionary } from "@shared/lib/i18n_server";
import { RouteProps } from "@shared/models/router";

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { order } = await getDictionary((await params).lang);

    return {
        title: order.myOrders,
    }
}

export default async function Orders() {
    return (
        <section>orders TODO</section>
    )
}
