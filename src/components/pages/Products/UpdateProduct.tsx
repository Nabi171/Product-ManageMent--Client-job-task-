import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface Variant {
  id: number
  product_id: number
  color: string
  specification: string
  size: string
  created_at: string
  updated_at: string
}

interface Product {
  id: number
  name: string
  brand: string
  type: string
  origin: string
  created_at: string
  updated_at: string
  description: string
  price: number
  variants: Variant[]
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Product | null>(null)

  useEffect(() => {
    // Fetch product data by ID
    fetch(`https://reactjr.coderslab.online/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const productData = data?.data || null
        setProduct(productData)
        setFormData(productData) // Initialize form data
      })
      .catch((error) => console.error("Error fetching product:", error))
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => prevData && { ...prevData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement API call to update product data
    fetch(`https://reactjr.coderslab.online/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product updated:", data)
        navigate(`/products/${id}`)
      })
      .catch((error) => console.error("Error updating product:", error))
  }

  if (!formData) return <p>Loading...</p>

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
          <label className="block text-gray-700 mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
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
  )
}

export default EditProduct
