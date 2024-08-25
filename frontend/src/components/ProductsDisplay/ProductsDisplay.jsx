import React, { useContext, useEffect, useState } from "react"
import "./ProductsDisplay.css"
import { StoreContext } from "../../context/StoreContext"
import ProductDetails from "../ProductDetails/ProductDetails"
import axios from "axios"
const ProductsDisplay = ({ category, viewType }) => {
  const { productsList, url, token } = useContext(StoreContext)

  const [products, setProducts] = useState([])
  const getUserProducts = async () => {
    const userProducts = await axios.get(url + "/api/product/getUserProducts", {
      headers: { token },
    })

    setProducts(userProducts.data.userProducts)
    console.log(products)
  }
  useEffect(() => {
    if (viewType === "myProducts") {
      getUserProducts()
    } else {
      setProducts(productsList)
    }
    console.log(products)
  }, [viewType, productsList])

  return (
    <div className='products-display-container'>
      {products.length > 0 ? (
        products.map((product, index) => {
          return category === "All" || category === product.category ? (
            <ProductDetails key={index} product={product} viewType={viewType} />
          ) : (
            <></>
          )
        })
      ) : (
        <>You have not listed any products</>
      )}
    </div>
  )
}

export default ProductsDisplay
