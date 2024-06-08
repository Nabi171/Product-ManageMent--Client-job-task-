/* eslint-disable prettier/prettier */

import { createBrowserRouter } from "react-router-dom"
import App from "../../App"
import ProductDetails from "../pages/Products/DetailViewProduct"
import EditProduct from "../pages/Products/UpdateProduct"
import CreateProduct from "../pages/Products/AddProduct"
import OrderList from "../pages/Orders/OrderList"
import CreateOrder from "../pages/Orders/CreateOrder"
import OrderDetails from "../pages/Orders/OrderDetails"
import EditOrder from "../pages/Orders/EditOrder"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/products/edit/:id",
    element: <EditProduct />,
  },
  {
    path: "/products/create",
    element: <CreateProduct />,
  },
  {
    path: "/orders",
    element: <OrderList />,
  },
  {
    path: "/orders/create",
    element: <CreateOrder />,
  },
  {
    path: "/orders/:id",
    element: <OrderDetails />,
  },
  {
    path: "/orders/edit/:id",
    element: <EditOrder />,
  },
])

export default routes
