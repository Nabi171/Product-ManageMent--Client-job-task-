/* eslint-disable prettier/prettier */

import { createBrowserRouter } from "react-router-dom"
import App from "../../App"
import ProductDetails from "../pages/Products/DetailViewProduct"
import EditProduct from "../pages/Products/UpdateProduct"

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
])

export default routes
