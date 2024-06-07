import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  console.log(product)
  useEffect(() => {
    // Simulated API call to fetch product data
    fetch(`https://reactjr.coderslab.online/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data?.data || []))
  }, [])

  const prod = !product ? (
    <div className="container mx-auto px-4">
      <div className="text-center">Product not found</div>
    </div>
  ) : (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{product?.name}</h3>
        <p className="text-gray-700 mb-2">
          <strong>Brand:</strong> {product?.brand}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Type:</strong> {product?.type}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Origin:</strong> {product?.origin}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Created At:</strong>{" "}
          {new Date(product?.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Updated At:</strong>{" "}
          {new Date(product?.updated_at).toLocaleDateString()}
        </p>
        {/* <p className="text-gray-700 mb-2">
          <strong>Price:</strong> ${product?.price.toFixed(2)}
        </p> */}
        {/* <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {product?.description}
        </p> */}

        <h4 className="text-lg font-bold mb-2">Variants:</h4>
        {product?.variants?.map((variant) => (
          <div
            key={variant.id}
            className="bg-gray-100 p-4 mb-4 rounded-lg shadow-inner"
          >
            <p className="text-gray-700 mb-1">
              <strong>Color:</strong> {variant?.color}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Specification:</strong> {variant?.specification}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Size:</strong> {variant?.size}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Created At:</strong>{" "}
              {new Date(variant?.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Updated At:</strong>{" "}
              {new Date(variant?.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div>{prod}</div>
    </>
  )
}

export default ProductDetails
