import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout";
import Home from "@pages/home/Home";
import NotFound from "@pages/notFound/NotFound";
import PropertyGroupTablePage from "@pages/propertyGroup/ui/PropertyGroupTable";
import PropertyGroupCreate from "@pages/propertyGroup/ui/PropertyGroupCreate";
import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import routerSubConfig from "@shared/config/router";
import CategoryCreatePage from "@pages/category/CategoryCreate";
import CategoryTablePage from "@pages/category/CategoryTable";
import Category from "@pages/category/Category";
import PropertyGroupPage from '@pages/propertyGroup/ui/PropertyGroup';
import ProductCreatePage from "@pages/product/ui/ProductCreate";
import ProductListPage from '@pages/product/ui/ProductTable';
import ProductPage from "@pages/product/ui/Product";

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
                path: routerSubConfig.dashboard.segment,
                children: [
                    {
                        index: true,
                        element: <div>dashboard</div>
                    },
                ],
            },
            {
                path: routerSubConfig.propertyGroupList.segment,
                children: [
                    {
                        index: true,
                        element: <PropertyGroupTablePage />,
                    },
                    {
                        path: CREATE_SEGMENT,
                        element: <PropertyGroupCreate />,
                    },
                    {
                        path: ":id",
                        element: <PropertyGroupPage />
                    },
                ],
            },
            {
                path: routerSubConfig.categoryList.segment,
                children: [
                    {
                        index: true,
                        element: <CategoryTablePage />,
                    },
                    {
                        path: CREATE_SEGMENT,
                        element: <CategoryCreatePage />,
                    },
                    {
                        path: ":url",
                        element: <Category />,
                    }
                ],
            },
            {
                path: routerSubConfig.productList.segment,
                children: [
                    {
                        index: true,
                        element: <ProductListPage />,
                    },
                    {
                        path: CREATE_SEGMENT,
                        element: <ProductCreatePage />,
                    },
                    {
                        path: ":url",
                        element: <ProductPage />,
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
