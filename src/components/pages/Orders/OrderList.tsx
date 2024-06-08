import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../layouts/Navbar"

interface Order {
  id: number
  name: string
  email: string
  address: string
  total_quantity: number
  created_at: string
  updated_at: string
}

interface OrdersResponse {
  data: {
    current_page: number
    data: Order[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: { url: string | null; label: string; active: boolean }[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://reactjr.coderslab.online/api/orders")
      .then((response) => response.json())
      .then((data: OrdersResponse) => {
        setOrders(data.data.data || [])
        setFilteredOrders(data.data.data || [])
      })
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      fetch(`https://reactjr.coderslab.online/api/orders/${id}`, {
        method: "DELETE",
      }).then(() =>
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id),
        ),
      )
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(value.toLowerCase()) ||
        order.email.toLowerCase().includes(value.toLowerCase()) ||
        order.address.toLowerCase().includes(value.toLowerCase()) ||
        order.id.toString().toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredOrders(filtered)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/orders/create")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Order
          </button>
          <input
            type="text"
            placeholder="Search by name, email, address, or ID..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-400 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <h1 className="text-xl font-bold my-4">Order List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-amber-50 border border-gray-100">
            {/* Table headers */}
            <thead className="bg-amber-50">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Total Quantity</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.name}</td>
                  <td className="border px-4 py-2">{order.email}</td>
                  <td className="border px-4 py-2">{order.address}</td>
                  <td className="border px-4 py-2">{order.total_quantity}</td>
                  <td className="border px-4 py-2">{order.created_at}</td>
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
