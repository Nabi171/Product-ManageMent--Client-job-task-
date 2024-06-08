import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const OrderList = () => {
  const [orders, setOrders] = useState([])
  console.log(orders)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://reactjr.coderslab.online/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data?.data?.data || []))
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      fetch(`https://reactjr.coderslab.online/api/orders/${id}`, {
        method: "DELETE",
      }).then(() => setOrders(orders.filter((order) => order.id !== id)))
    }
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/orders/create")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Create Order
        </button>
        <h1 className="text-xl font-bold my-4">Order List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order?.name}</td>
                  <td className="border px-4 py-2">{order?.brand}</td>
                  <td className="border px-4 py-2">{order.type}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => navigate(`/orders/edit/${order.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrderList
