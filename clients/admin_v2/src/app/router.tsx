import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Home from "@pages/home/Home";
import NotFound from "@pages/notFound/NotFound";
import PropertyGroupList from "@pages/propertyGroup/ui/PropertyGroupList";
import PropertyGroupCreate from "@pages/propertyGroup/ui/PropertyGroupCreate";
import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import routerSubConfig from "@shared/config/router";
import CategoryCreate from "@pages/category/CategoryCreate";
import CategoryList from "@pages/category/CategoryList";
import Category from "@pages/category/Category";

const routerConfig = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: routerSubConfig.propertyGroupList.segment,
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
                path: routerSubConfig.categoryList.segment,
                children: [
                    {
                        index: true,
                        element: <CategoryList />,
                    },
                    {
                        path: CREATE_SEGMENT,
                        element: <CategoryCreate />,
                    },
                    {
                        path: ":url",
                        element: <Category />,
                    }
                ],
            },
            {
                path: "",
                element: <NotFound />
            }
        ],
    },
]);

export default routerConfig;
