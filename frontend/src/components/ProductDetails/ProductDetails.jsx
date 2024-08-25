import React, { useContext, useState } from "react"
import "./ProductDetails.css"
import { assets } from "../../assets/assets"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ProductDetails = ({ key, product, viewType }) => {
  const [request, setRequest] = useState("REQUEST")
  const { url, token } = useContext(StoreContext)
  const navigate = useNavigate()

  const requestHandler = async (event, product) => {
    console.log("Hi")
    console.log(product)
    const response = await axios.post(
      url + "/api/product/request",
      {
        id: product._id,
      },
      { headers: { token } }
    )
    if (response.data.success) {
      setRequest("REQUESTED")
    } else {
      console.log(response.data)
    }
  }
  const seeRequestsHandler = (event) => {
    navigate(`/product?productId=${product._id}`)
  }

  return (
    <div className='product-details-container'>
      <div className='img-container'>
        <img src={`${url}/images/${product.image}`} />
      </div>
      <div className='price-container'>
        <div className='price'>
          <p>{product.name}</p>
          <p>Price: ${product.price}/hr</p>
          <p>{product.category}</p>
        </div>
        {viewType === "display" ? (
          <></>
        ) : (
          <div className='add-to-cart-container'>
            {viewType === "allProducts" ? (
              <button onClick={(event) => requestHandler(event, product)}>
                {request}
              </button>
            ) : (
              <div className='see-requests'>
                <button onClick={(event) => seeRequestsHandler(event)}>
                  See requests
                </button>
                <p>{product.requestedBy.length}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
