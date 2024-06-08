import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../layouts/Navbar"
import Footer from "../Footer"
import { UniVersalType } from "../../types/globalTypes"

export default function EditOrder() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    // Fetch order data by ID
    fetch(`https://reactjr.coderslab.online/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const orderData = data?.data || null
        setOrder(orderData)
        setFormData(orderData) // Initialize form data
      })
      .catch((error) => console.error("Error fetching order:", error))
  }, [id])

  const handleChange = (e: UniVersalType) => {
    const { name, value } = e.target
    setFormData((prevData: any) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: UniVersalType) => {
    e.preventDefault()
    // Implement API call to update order data
    fetch(`https://reactjr.coderslab.online/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order updated:", data)
        navigate(`/orders/${id}`)
      })
      .catch((error) => console.error("Error updating order:", error))
  }

  if (!formData)
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Total Quantity</label>
            <input
              type="number"
              name="total_quantity"
              value={formData.total_quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Add more fields as needed */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}
