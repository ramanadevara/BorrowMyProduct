import React, { useContext } from "react"
import { assets } from "../../assets/assets"
import "./Navbar.css"
import { StoreContext } from "../../context/StoreContext"
import { Link, useNavigate } from "react-router-dom"

const Navbar = ({ showLogin, setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  const onRequestClickHandler = () => {
    navigate("/requests")
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <b className='logo'>BorrowMyProduct</b>
      </Link>

      <ul className='menu-container'>
        <li>home</li>
        <li>mobile-app</li>
        <li>contact us</li>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt='' />
        <img src={assets.basket_icon} />

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img className='profile-icon' src={assets.profile_icon} />
            <ul className='nav-profile-dropdown'>
              <li onClick={onRequestClickHandler}>
                <img src={assets.bag_icon} />
                <p>My requests</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
