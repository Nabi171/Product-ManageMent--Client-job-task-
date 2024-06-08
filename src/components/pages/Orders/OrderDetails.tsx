import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetch(`https://reactjr.coderslab.online/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
  }, [id])

  return (
    <div>
      {order ? (
        <div>
          <h1>Order Details</h1>
          {/* Order details UI */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default OrderDetails
