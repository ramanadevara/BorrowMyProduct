import React, { useContext, useEffect, useState } from "react"
import "./Login.css"
import { assets } from "../../assets/assets"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign up")

  const { url, setToken } = useContext(StoreContext)

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currentState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/add"
    }

    const response = await axios.post(newUrl, data)

    console.log(response.data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup-container'>
      <form onSubmit={formSubmitHandler} className='login-form'>
        <div className='login-form-title'>
          <p>{currentState}</p>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>
        <div className='login-inputs'>
          {currentState === "Sign up" ? (
            <input
              onChange={onChangeHandler}
              type='text'
              placeholder='Name'
              name='name'
              value={data.name}
            />
          ) : (
            <></>
          )}
          <input
            onChange={onChangeHandler}
            type='email'
            placeholder='Email'
            name='email'
            value={data.email}
          />
          {currentState === "Sign up" ? (
            <input
              onChange={onChangeHandler}
              type='phone'
              placeholder='Phone'
              name='phone'
              value={data.phone}
            />
          ) : (
            <></>
          )}
          <input
            onChange={onChangeHandler}
            type='password'
            placeholder='Password'
            name='password'
            value={data.password}
          />
        </div>
        <button type='submit'>{currentState}</button>
        <p className='login-signup'>
          {currentState === "Sign up" ? (
            <div>
              Already a user?{" "}
              <span onClick={() => setCurrentState("Login")}>Sign in</span>
            </div>
          ) : (
            <div>
              New User?{" "}
              <span onClick={() => setCurrentState("Sign up")}>Sign up</span>
            </div>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login
