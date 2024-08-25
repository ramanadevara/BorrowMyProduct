import React, { useContext, useEffect, useState } from "react"
import "./ProductRequests.css"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import ProductDetails from "../../components/ProductDetails/ProductDetails"

const ProductRequests = () => {
  const { url, token } = useContext(StoreContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [product, setProduct] = useState({ requestedBy: [] })

  const productId = searchParams.get("productId")

  const loadProduct = async () => {
    const response = await axios.post(
      url + "/api/product/getProduct",
      {
        productId,
      },
      { headers: { token } }
    )

    if (response.data.success) {
      console.log(response.data.product)
      setProduct(response.data.product)
    } else {
      alert(response.data)
    }
  }

  useEffect(() => {
    loadProduct()
  }, [])

  return (
    <div className='product-requests-container'>
      {product.requestedBy.length > 0 ? (
        <div className='product-requests-display'>
          <div className='product-display'>
            <ProductDetails product={product} viewType='display' />
          </div>
          <div className='requests-display'>
            <h2> Requests</h2>
            {product.requestedBy.map((user, index) => (
              <div className='request'>
                <p>{user.name} requested this item</p>
                <div className='buttons'>
                  <button className='approve'>Approve</button>
                  <button className='reject'> Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>You have no requests</h2>
      )}
    </div>
  )
}

export default ProductRequests
