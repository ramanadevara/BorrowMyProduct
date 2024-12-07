import React, { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./components/Login/Login"
import AddProduct from "./pages/AddProduct/AddProduct"
import MyProducts from "./pages/MyProducts/MyProducts"
import ProductRequests from "./pages/ProductRequests/ProductRequests"
import UserRequests from "./pages/UserRequests/UserRequests"
import Footer from "./components/Footer/Footer"
import AppDownload from "./components/AppDownload/AppDownload"

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/myProducts' element={<MyProducts />} />
        <Route path='/product' element={<ProductRequests />} />
        <Route path='/requests' element={<UserRequests />} />
      </Routes>
      <AppDownload />
      <Footer />
    </div>
  )
}

export default App
