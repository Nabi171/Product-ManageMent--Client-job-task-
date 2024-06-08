import React, { useState, useEffect, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../layouts/Navbar"
import Footer from "../Footer"
import {
  Product,
  Variant,
  UserInfo,
  OrderDetail,
  OrderForCreate,
} from "../../types/globalTypes"

const CreateOrder: React.FC = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [variants, setVariants] = useState<{ [key: number]: number }>({})
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    address: "",
    email: "",
  })
  const [step, setStep] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetch("https://reactjr.coderslab.online/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.data.data))
      .catch(() => setError("Failed to fetch products"))
  }, [])

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleProductChange = (productId: number, isChecked: boolean) => {
    setSelectedProducts(
      isChecked
        ? [...selectedProducts, productId]
        : selectedProducts.filter((id) => id !== productId),
    )
  }

  const handleVariantChange = (productId: number, variantId: number) => {
    setVariants({ ...variants, [productId]: variantId })
  }

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities({ ...quantities, [productId]: quantity })
  }

  const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = () => {
    setLoading(true)
    const orderData: OrderForCreate = {
      user: userInfo,
      details: selectedProducts.map((productId) => ({
        variant_id: variants[productId],
        quantity: quantities[productId],
      })),
    }

    fetch("https://reactjr.coderslab.online/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create order")
        }
        return response.json()
      })
      .then(() => {
        setLoading(false)
        navigate("/orders")
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {step === 1 && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Select Products
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-4">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleProductChange(product.id, e.target.checked)
                      }
                      className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                    />
                    <label className="ml-2 cursor-pointer">
                      <span className="block text-sm font-medium text-gray-900">
                        {product.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {product.brand} - {product.type}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex justify-center items-center h-full">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Select Variants
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {selectedProducts.map((productId) => {
                  const product = products.find((p) => p.id === productId)
                  return (
                    <div
                      key={productId}
                      className="bg-white shadow-md rounded-lg p-6"
                    >
                      <h3 className="text-xl font-bold mb-4">
                        {product?.name}
                      </h3>
                      <select
                        onChange={(e) =>
                          handleVariantChange(productId, Number(e.target.value))
                        }
                        className="block w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select Variant</option>
                        {product?.variants.map((variant) => (
                          <option key={variant.id} value={variant.id}>
                            {variant.color} - {variant.specification} -{" "}
                            {variant.size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                })}
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mr-4 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Specify Quantities
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProducts.map((productId) => {
                const product = products.find((p) => p.id === productId)
                return (
                  <div
                    key={productId}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    <h3 className="text-xl font-bold mb-4">{product?.name}</h3>
                    <input
                      type="number"
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(productId, Number(e.target.value))
                      }
                      className="block w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    />
                  </div>
                )
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mr-4 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              User Information
            </h2>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="block w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md mb-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={userInfo.address}
                onChange={handleUserInfoChange}
                className="block w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="block w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md mb-2"
              />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mr-4 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default CreateOrder
