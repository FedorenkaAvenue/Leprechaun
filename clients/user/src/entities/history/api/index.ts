import clientAPI from "@shared/lib/api_client";

export async function getProductHistory() {
    const res = await clientAPI.get('/history/product');

    return res.data;
}
