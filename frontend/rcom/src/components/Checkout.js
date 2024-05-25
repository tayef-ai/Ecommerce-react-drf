import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Checkout = () => {
  const [cartdata, setCartdata] = useState('')
  const [cp, setCP] = useState('')
  const cust_email = localStorage.getItem('customer_email')
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/cart/?email=${cust_email}`)
      .then((response) => response.json())
      .then((data) => {
        setCartdata(data)
        console.log("===============", data)
      })
  },[cp])
  const cartminus = (pid) => {
    fetch(`http://127.0.0.1:8000/minuscart?email=${cust_email}&prod_id=${pid}`)
    .then((response) => response.json())
    .then((data) => {
      setCP(data)
      console.log("============", data)
    })
  }
  const cartplus = (pid) => {
    fetch(`http://127.0.0.1:8000/pluscart?email=${cust_email}&prod_id=${pid}`)
    .then((response) => response.json())
    .then((data) => {
      setCP(data)
      // console.log("============", data)
    })
  }
  const removecart = (pid) => {
    fetch(`http://127.0.0.1:8000/removecart?email=${cust_email}&prod_id=${pid}`)
    .then((response) => response.json())
    .then((data) => {
      setCP(data)
      // console.log("============", data)
    })
  }
  return (
    <div className='container mt-4'>
      <h3>Checkout</h3>
      <div className="row">
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th>ID.</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cartdata.carts?.map((cd, index) => <tr key={index}><td>{index+1}</td><td>{cd.product.title}</td><td><span className='btn btn-secondary btn-sm' onClick={() => cartminus(cd.product.id)}><i class="fa-solid fa-circle-minus"></i></span>  {cd.quantity}  <span className='btn btn-sm btn-secondary' onClick={() => cartplus(cd.product.id)}><i class="fa-solid fa-circle-plus"></i></span></td><td>{cd.product.price}</td><td className='btn btn-sm btn-danger' onClick={() => removecart(cd.product.id)}>Remove Item</td></tr>)
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" align='right'>Total Price:</td>
                <th>{cartdata?.amount}</th>
              </tr>
            </tfoot>
          </table>
          <Link className='btn btn-primary btn-sm ms-5 me-2' to='/'>Continue Shopping</Link>
          <Link className='btn btn-success btn-sm' to='/payment_done'>Place order</Link>
        </div>
        <div className="col-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><h5>The Total Amount</h5></li>
              <li className="list-group-item"><b>Amount:</b> {cartdata?.amount}</li>
              <li className="list-group-item"><b>Shipping:</b> {cartdata?.shipping_amount}</li>
              <li className="list-group-item"><b>Total:</b> {cartdata?.totalamount}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout