import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../layouts/Navbar"
import Footer from "../Footer"

const EditOrder = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetch(`https://reactjr.coderslab.online/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
  }, [id])

  const handleSubmit = () => {
    fetch(`https://reactjr.coderslab.online/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then(() => navigate("/orders"))
  }

  return (
    <>
      <Navbar />
      <div>
        {order ? (
          <div>
            <h1>Edit Order</h1>
            {/* Edit order form */}
            <button onClick={handleSubmit}>Update Order</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  )
}

export default EditOrder
