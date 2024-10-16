import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Home from "@pages/home/Home";
import NotFound from "@pages/notFound/NotFound";
import PropertyGroups from "@pages/propertyGroup/ui/PropertyGroups";
import PropertyGroupCreate from "@pages/propertyGroup/ui/PropertyGroupCreate";
import { PROPERTY_GROUP_PATH_SEGMENT, CREATE_SEGMENT } from "@shared/constants/routes";

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
                        element: <PropertyGroups />,
                    },
                    {
                        path: CREATE_SEGMENT,
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
