import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Home from "@pages/home/Home";
import NotFound from "@pages/notFound/NotFound";
import PropertyGroup from "@pages/propertyGroup/ui/PropertyGroup";
import PropertyGroupCreate from "@pages/propertyGroup/ui/PropertyGroupCreate";
import { PROPERTY_GROUP_PATH_SEGMENT, PROPERTY_GROUP_CREATE_PATH_SEGMENT } from "@shared/constants/routes";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: PROPERTY_GROUP_PATH_SEGMENT,
                children: [
                    {
                        index: true,
                        element: <PropertyGroup />,
                    },
                    {
                        path: PROPERTY_GROUP_CREATE_PATH_SEGMENT,
                        element: <PropertyGroupCreate />,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);

export default router;
