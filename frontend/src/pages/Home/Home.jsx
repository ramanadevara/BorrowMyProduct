import React, { useContext, useState } from "react"
import "./Home.css"
import { assets, categories } from "../../assets/assets"
import ProductsDisplay from "../../components/ProductsDisplay/ProductsDisplay"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from "../../context/StoreContext"

const Home = () => {
  const [category, setCategory] = useState("All")

  const { token } = useContext(StoreContext)
  const navigate = useNavigate()
  const handleClick = () => {
    if (token) {
      navigate("/addProduct")
    } else {
      alert("Please sign in first")
    }
  }
  return (
    <div className='home'>
      <div className='home-options'>
        <div className='buttons-container'>
          <div className='add-product'>
            <button onClick={handleClick}>Add new product</button>
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
      <ProductsDisplay category={category} viewType='allProducts' />
    </div>
  )
}

export default Home
