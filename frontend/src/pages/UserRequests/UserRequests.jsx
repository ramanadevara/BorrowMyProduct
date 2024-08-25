import React, { useContext, useEffect, useState } from "react"
import "./UserRequests.css"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"

const UserRequests = () => {
  const [products, setProducts] = useState([])
  const { url, token } = useContext(StoreContext)

  const getProducts = async () => {
    const response = await axios.post(url + "/api/user/requests", "", {
      headers: { token },
    })

    if (response.data.success) {
      setProducts(response.data.requests)
    } else {
      console.log(response.data)
      alert(response.data.message)
    }
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
                  {/*{product.isApproved ? <p>Approved</p> : <p>Requested</p>}*/}
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
