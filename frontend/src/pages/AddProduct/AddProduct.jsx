import React, { useContext, useEffect, useState } from "react"
import "./AddProduct.css"
import { assets, categories } from "../../assets/assets"
import axios from "axios"
import { StoreContext } from "../../context/StoreContext"

const AddProduct = () => {
  const [image, setImage] = useState(null)
  const { url, token, getProducts } = useContext(StoreContext)

  const [submitState, setSubmitState] = useState(false)
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "Electronics",
  })

  const [message, setMessage] = useState(null)

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(url + "/api/product/add", formData, {
      headers: { token },
    })
    setSubmitState(true)
    if (response.data.success) {
      setData({ name: "", price: "", category: "" })
      setImage(null)
      setMessage("Product posted successfully")
      await getProducts()
    } else {
      console.log(response.data)
      setMessage("Error posting product")
    }
  }

  return (
    <>
      {token ? (
        <div className='add-product-container'>
          <h2
            className={`message ${
              submitState
                ? data.name === ""
                  ? "active success"
                  : "active error"
                : ""
            }`}
          >
            {message}
          </h2>
          <h2>Add your product</h2>
          <form
            className='add-product-form'
            onSubmit={(e) => onSubmitHandler(e)}
          >
            <div className='product-image-container'>
              <p>Upload image</p>
              <label htmlFor='image'>
                {image ? (
                  <img src={URL.createObjectURL(image)} />
                ) : (
                  <img src={assets.upload_area} />
                )}

                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type='file'
                  id='image'
                  hidden
                  name='image'
                  required
                />
              </label>
            </div>
            <input
              type='text'
              placeholder='Product name'
              name='name'
              value={data.name}
              onChange={(e) => onChangeHandler(e)}
            />
            <input
              type='number'
              placeholder='Price'
              name='price'
              value={data.price}
              onChange={(e) => onChangeHandler(e)}
            />
            <select
              onChange={(e) => onChangeHandler(e)}
              name='category'
              value={data.category}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button>Add</button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default AddProduct
