import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../layouts/Navbar"
import Footer from "../Footer"

interface Variant {
  id: number
  product_id: number
  color: string
  specification: string
  size: string
  created_at: string
  updated_at: string
}

interface OrderDetail {
  id: number
  order_id: number
  variant_id: number
  quantity: number
  created_at: string
  updated_at: string
  variant: Variant
}

interface Order {
  id: number
  name: string
  email: string
  address: string
  total_quantity: number
  created_at: string
  updated_at: string
  details: OrderDetail[]
}

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  console.log(order)
  useEffect(() => {
    fetch(`https://reactjr.coderslab.online/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data?.data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [id])

  if (!order) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* <h1 className="text-3xl font-bold mb-8">Order Details</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Order Information */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Information</h2>
            <div className="space-y-4">
              <p className="text-gray-800">
                <strong>ID:</strong> {order.id}
              </p>
              <p className="text-gray-800">
                <strong>Name:</strong> {order.name}
              </p>
              <p className="text-gray-800">
                <strong>Email:</strong> {order.email}
              </p>
              <p className="text-gray-800">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-800">
                <strong>Total Quantity:</strong> {order.total_quantity}
              </p>
              <p className="text-gray-800">
                <strong>Created At:</strong> {order.created_at}
              </p>
              <p className="text-gray-800">
                <strong>Updated At:</strong> {order.updated_at}
              </p>
            </div>
          </div>
          {/* Order Details */}
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-6">
              {order.details.map((detail) => (
                <div
                  key={detail.id}
                  className="border border-gray-300 rounded-md p-4"
                >
                  <h3 className="text-lg font-bold mb-2">
                    Detail ID: {detail.id}
                  </h3>
                  <p className="text-gray-800">
                    <strong>Order ID:</strong> {detail.order_id}
                  </p>
                  <p className="text-gray-800">
                    <strong>Variant ID:</strong> {detail.variant_id}
                  </p>
                  <p className="text-gray-800">
                    <strong>Quantity:</strong> {detail.quantity}
                  </p>
                  <p className="text-gray-800">
                    <strong>Created At:</strong> {detail.created_at}
                  </p>
                  <p className="text-gray-800">
                    <strong>Updated At:</strong> {detail.updated_at}
                  </p>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <h4 className="text-lg font-bold mb-2">
                      Variant Information
                    </h4>
                    <p className="text-gray-800">
                      <strong>ID:</strong> {detail.variant.id}
                    </p>
                    <p className="text-gray-800">
                      <strong>Product ID:</strong> {detail.variant.product_id}
                    </p>
                    <p className="text-gray-800">
                      <strong>Color:</strong> {detail.variant.color}
                    </p>
                    <p className="text-gray-800">
                      <strong>Specification:</strong>{" "}
                      {detail.variant.specification}
                    </p>
                    <p className="text-gray-800">
                      <strong>Size:</strong> {detail.variant.size}
                    </p>
                    <p className="text-gray-800">
                      <strong>Created At:</strong> {detail.variant.created_at}
                    </p>
                    <p className="text-gray-800">
                      <strong>Updated At:</strong> {detail.variant.updated_at}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OrderDetails
