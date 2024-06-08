import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Product } from "../../types/globalTypes"

export default function ProductTable() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulated API call to fetch product data
    fetch("https://reactjr.coderslab.online/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data?.data?.data || [])
        setFilteredProducts(data?.data?.data || [])
      })
      .catch((error) => console.error("Error fetching products:", error))
  }, [])

  const handleEdit = (id: number) => {
    navigate(`/products/edit/${id}`)
    console.log(`Edit product with ID: ${id}`)
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`https://reactjr.coderslab.online/api/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error deleting product")
          }
          setProducts(products.filter((product) => product.id !== id))
          setFilteredProducts(
            filteredProducts.filter((product) => product.id !== id),
          )
        })
        .catch((error) => {
          console.error("Error deleting product:", error)
          setError("Failed to delete product. Please try again.")
        })
    }
  }

  const handleView = (id: number) => {
    navigate(`/products/${id}`)
  }

  const handleCreate = () => {
    navigate(`/products/create`)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)

    const filtered = products.filter(
      (product) =>
        product.id.toString().toLowerCase().includes(value.toLowerCase()) ||
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.brand.toLowerCase().includes(value.toLowerCase()) ||
        product.type.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleCreate}
        >
          Create Product
        </button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-400 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-amber-50 border border-gray-100">
          {/* Table headers */}
          <thead className="bg-amber-50">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.brand}</td>
                <td className="px-4 py-2 border">{product.type}</td>
                <td className="px-4 py-2 border">{product.created_at}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 border-2 border-blue-500"
                    onClick={() => handleView(product.id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
