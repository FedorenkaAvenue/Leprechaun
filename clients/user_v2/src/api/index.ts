export async function appRequest<B>(url: string): Promise<B> {
    const res = await fetch(`http://api.leprechaun.loc/${url}`);

    return res.json();
}
