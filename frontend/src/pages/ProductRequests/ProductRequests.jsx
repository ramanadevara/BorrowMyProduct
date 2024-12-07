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
  const [approvedUserId, setApprovedUserId] = useState(null)

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

  const approveUser = async (user) => {
    const response = await axios.post(
      url + "/api/product/approve",
      { productId: productId, reqUserId: user._id },
      { headers: { token } }
    )

    if (response.data.success) {
      setApprovedUserId(response.data.product.approvedUser)
    } else {
      console.log(response.data)
      alert("Approval failed")
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
                  {approvedUserId === user._id ? (
                    <button className='approve'>Approved</button>
                  ) : (
                    <>
                      <button
                        className='approve'
                        onClick={() => approveUser(user)}
                      >
                        Approve
                      </button>
                      <button className='reject'> Reject</button>
                    </>
                  )}
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
