import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from './context'

export const Navbar = () => {
  const cust_email = localStorage.getItem('customer_email')
  const context = useContext(userContext)
  const [cartCount, set_CartCount] = useState(null)
  useEffect(() => {
    // console.log(cartCount)
    fetch(`http://127.0.0.1:8000/count/?email=${cust_email}`)
      .then((response) => response.json())
      .then((data) => {
        // if (cartCount != data?.cart_count?.cart_count) {
          set_CartCount(data?.cart_count?.cart_count)
          console.log(data?.cart_count)
          // console.log("vv", cartCount)
        //   console.log("dat", data?.cart_count?.cart_count)
        // }
        // console.log("vv", cartCount)
      })
  }, [cartCount])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">BDshop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
              </a>
              <ul class="dropdown-menu">
                {
                  context != 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  </>
                }
                {
                  context == 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                  </>
                }
              </ul>
            </li>
            {
              context == 'true' &&
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">My Cart ({cartCount})</Link>
              </li>
            }
            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
            {/* <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> */}
          </ul>
          {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
  )
}
