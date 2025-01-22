import { toast } from "react-toastify";

export async function resetServerCache() {
    const res = await fetch('/cache/reset');

    return res.status === 200 ? toast.success('Cache has been reseted') : toast.error(res.statusText);
}
