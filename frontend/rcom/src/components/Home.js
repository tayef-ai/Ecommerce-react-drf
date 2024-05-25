import React, { useEffect, useState } from 'react'
import SingleProduct from "./SingleProduct";
import AllProducts from './AllProducts';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [Products, setProducts] = useState([])
  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
    .then((response) => response.json())
    .then((data) => {
      setProducts(data)
    })
  }, [])
  return (
    <div className="container">
      <h3 className="mt-3">Latest Products<Link to='/products' className="float-end btn btn-sm btn-primary mt-2">View all Products <i class="fa-solid fa-arrow-right"></i></Link></h3>
      <div className='row'>
        {
          Products.map((product) => <SingleProduct product={product} />)
        }
      </div>
    </div>
  )
}
