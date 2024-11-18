import clientAPI from "@shared/lib/clientApi";

export async function getProductHistory() {
    const res = await clientAPI.get('/history/product');

    return res.data;
}
