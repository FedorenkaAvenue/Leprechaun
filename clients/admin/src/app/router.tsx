import { createBrowserRouter } from "react-router";

import HomePage from "@pages/home/ui/Home";
import NotFoundPage from "@pages/error/ui/404";
import PropertyGroupTablePage from "@pages/propertyGroup/ui/PropertyGroupTable";
import PropertyGroupCreate from "@pages/propertyGroup/ui/PropertyGroupCreate";
import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import routerSubConfig from "@shared/config/router";
import CategoryCreatePage from "@pages/category/ui/CategoryCreate";
import CategoryTablePage from "@pages/category/ui/CategoryTable";
import Category from "@pages/category/ui/Category";
import PropertyGroupPage from '@pages/propertyGroup/ui/PropertyGroup';
import ProductCreatePage from "@pages/product/ui/ProductCreate";
import ProductListPage from '@pages/product/ui/ProductTable';
import ProductPage from "@pages/product/ui/Product";
import DashboardPage from "@pages/dashboard/ui/Dashboard";
import ToolsPage from "@pages/tools/ui/Tools";
import SocketsPage from "@pages/connections/ui/Sockets";
import AuthPage from "@pages/auth/ui/Auth";
import App from "./app";
import { AuthLayout, NonAuthLayout } from "./layouts";
import InternalServerErrorPage from "@pages/error/ui/500";
import EmployerTable from "@pages/admin/ui/EmployerTable";

const routerConfig = createBrowserRouter([
    {
        Component: App,
        errorElement: <InternalServerErrorPage />,
        children: [
            {
                path: routerSubConfig.auth.path,
                element: <NonAuthLayout />,
                children: [
                    {
                        index: true,
                        element: <AuthPage />,
                    },
                ]
            },
            {
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: routerSubConfig.admin.segment,
                        children: [
                            {
                                index: true,
                                element: <EmployerTable />,
                            },
                            {
                                path: routerSubConfig.employerList.segment,
                                element: <EmployerTable />,
                            },
                        ],
                    },
                    {
                        path: routerSubConfig.tools.segment,
                        children: [
                            {
                                index: true,
                                element: <ToolsPage />
                            }
                        ],
                    },
                    {
                        path: routerSubConfig.dashboard.segment,
                        children: [
                            {
                                index: true,
                                element: <DashboardPage />,
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
                        path: 'connections',
                        element: <SocketsPage />,
                    },
                    {
                        path: '*',
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
]);

export default routerConfig;
