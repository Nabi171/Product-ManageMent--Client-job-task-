import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../layouts/Navbar"
import Footer from "../Footer"

interface Variant {
  color: string
  specification: string
  size: string
}

interface Product {
  name: string
  brand: string
  type: string
  origin: string
  description: string
  price: number
  variants: Variant[]
}

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    brand: "",
    type: "",
    origin: "",
    description: "",
    price: 0,
    variants: [],
  })

  const [variant, setVariant] = useState<Variant>({
    color: "",
    specification: "",
    size: "",
  })

  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariant({
      ...variant,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, variant],
    })
    setVariant({
      color: "",
      specification: "",
      size: "",
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulated API call to create product data
    fetch(`https://reactjr.coderslab.online/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          return response.json()
        } else {
          const text = await response.text()
          throw new Error(`Unexpected response: ${text}`)
        }
      })
      .then((data) => {
        console.log("Product created:", data)
        navigate(`/`)
      })
      .catch((error) => {
        console.error("Error creating product:", error)
      })
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="brand"
              name="brand"
              type="text"
              value={product.brand}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              type="text"
              value={product.type}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="origin"
            >
              Origin
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="origin"
              name="origin"
              type="text"
              value={product.origin}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <h3 className="text-lg font-bold mb-4">Add Variants</h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="color"
            >
              Color
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="color"
              name="color"
              type="text"
              value={variant.color}
              onChange={handleVariantChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="specification"
            >
              Specification
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="specification"
              name="specification"
              type="text"
              value={variant.specification}
              onChange={handleVariantChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="size"
            >
              Size
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="size"
              name="size"
              type="text"
              value={variant.size}
              onChange={handleVariantChange}
            />
          </div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            onClick={handleAddVariant}
          >
            Add Variant
          </button>

          {product.variants.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Variants</h4>
              {product.variants.map((variant, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 mb-4 rounded-lg shadow-inner"
                >
                  <p className="text-gray-700 mb-1">
                    <strong>Color:</strong> {variant.color}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Specification:</strong> {variant.specification}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Size:</strong> {variant.size}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default CreateProduct
