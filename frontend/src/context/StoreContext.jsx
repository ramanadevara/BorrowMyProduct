import { createContext, useContext, useEffect, useState } from "react"
import { products_list } from "../assets/assets"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [requestItems, setRequestItems] = useState([])
  const [token, setToken] = useState("")
  const [productsList, setProductsList] = useState([])

  const url = "http://localhost:4000"

  const addRequest = (id) => {
    if (!requestItems[id]) {
      setRequestItems(requestItems.push(id))
    }
  }

  const getProducts = async () => {
    const response = await axios.get(url + "/api/product/get")

    setProductsList(response.data.products)
  }

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      }
      await getProducts()
    }

    loadData()
  }, [])

  const contextValue = {
    productsList,
    url,
    token,
    setToken,
    getProducts,
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
