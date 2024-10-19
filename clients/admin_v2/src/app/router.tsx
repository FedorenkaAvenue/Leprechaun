import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Home from "@pages/home/Home";
import NotFound from "@pages/notFound/NotFound";
import PropertyGroupList from "@pages/propertyGroup/ui/PropertyGroupList";
import PropertyGroupCreate from "@pages/propertyGroup/ui/PropertyGroupCreate";
import { PROPERTY_GROUP_PATH_SEGMENT, CREATE_SEGMENT } from "@shared/constants/router";

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
                        element: <PropertyGroupList />,
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
