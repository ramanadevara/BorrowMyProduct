import React, { useState } from "react"
import "./MyProducts.css"
import { assets, categories } from "../../assets/assets"
import ProductsDisplay from "../../components/ProductsDisplay/ProductsDisplay"
import { Link } from "react-router-dom"

const MyProducts = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <div className='home'>
        <div className='home-options'>
          <div className='buttons-container'>
            <div className='add-product'>
              <Link to='/addProduct'>
                <button>Add new product</button>
              </Link>
            </div>
            <div className='add-product'>
              <Link to='/myProducts'>
                <button>My Products</button>
              </Link>
            </div>
          </div>
          <div className='category-container'>
            <p>Category:</p>
            <select
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              {categories.map((categoryValue, index) => (
                <option key={index} value={categoryValue}>
                  {categoryValue}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ProductsDisplay category={category} viewType='myProducts' />
      </div>
    </div>
  )
}

export default MyProducts
