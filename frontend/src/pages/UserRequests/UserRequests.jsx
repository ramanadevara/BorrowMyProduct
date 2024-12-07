import React, { useContext, useEffect, useState } from "react"
import "./UserRequests.css"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"

const UserRequests = () => {
  const [products, setProducts] = useState([])
  const { url, token } = useContext(StoreContext)

  const checkApproved = async (product) => {
    const response = await axios.post(
      url + "/api/product/check",
      { product: product },
      {
        headers: { token },
      }
    )
    console.log(response.data)

    return response.data.success
  }

  const getProducts = async () => {
    const response = await axios.post(url + "/api/user/requests", "", {
      headers: { token },
    })

    if (response.data.success) {
      const responseWithCheck = await Promise.all(
        response.data.requests.map(async (product) => {
          const isApproved = await checkApproved(product)

          if (isApproved) {
            const ownerDetails = await getOwnerDetails(product)
            return { ...product, isApproved, ownerDetails }
          }
          return { ...product, isApproved }
        })
      )
      console.log(responseWithCheck)
      setProducts(responseWithCheck)
    } else {
      console.log(response.data)
      alert(response.data.message)
    }
  }

  const getOwnerDetails = async (product) => {
    const response = await axios.post(url + "/api/product/getOwner", product, {
      headers: { token },
    })
    const userDetails = { name: "", phone: "" }
    if (response.data.success) {
      userDetails.name = response.data.userDetails.name
      userDetails.phone = response.data.userDetails.phone
    }

    return userDetails
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='user-requests-container'>
      <h2>Your requests</h2>
      {products.length > 0 ? (
        <div className='user-requests-list-container'>
          <div className='headings'>
            <p>Product Image</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Category</p>
            <p>Status</p>
          </div>
          <div className='user-requests-list'>
            {products.map((product, index) => (
              <>
                <div className='user-request'>
                  <img src={`${url}/images/${product.image}`} />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <p>{product.category}</p>
                  {product.isApproved ? (
                    <>
                      <p>Approved</p>
                    </>
                  ) : (
                    <p>Requested</p>
                  )}
                  {product.isApproved ? (
                    <div className='success-container'>
                      {" "}
                      <p>
                        Your product has been approved. Please contact{" "}
                        {product.ownerDetails.name} at{" "}
                        {product.ownerDetails.phone}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {index === products.length - 1 ? <></> : <hr />}
              </>
            ))}
          </div>
        </div>
      ) : (
        <h3>You have not requested any product</h3>
      )}
    </div>
  )
}

export default UserRequests
