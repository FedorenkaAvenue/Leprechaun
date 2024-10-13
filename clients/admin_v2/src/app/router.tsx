import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/users",
                element: <div>euser</div>
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);

export default router;
