import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct'
import { Link, useParams } from 'react-router-dom'

const AllProducts = () => {
  const [Products, setProducts] = useState([])
  // const [total, setTotal] = useState(0)
  // const [url, setUrl] = useState('http://127.0.0.1:8000/')
  const { category_id } = useParams()
  useEffect(() => {
    if (category_id) {
      fetch(`http://127.0.0.1:8000/category/${category_id}/`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.product_category)
          console.log(data)
        })
    }
    else {
      fetch('http://127.0.0.1:8000/')
        .then((response) => response.json())
        .then((data) => {
          setProducts(data)
          // console.log(category_id)
          // setTotal(data.count)
        })
    }

  }, [])

  // var links = []
  // for(let i=1; i<=total; i++){
  //   links.push(<li class="page-item"><Link className="page-link" onClick={()=>setUrl(`http://127.0.0.1:8000/?page=${i}`)}>{i}</Link></li>)
  // }
  return (
    <div className="container">
      <h3 className="mt-3">All Products</h3>
      <div className='row'>
        {
          Products.map((product) => <SingleProduct product={product} />)
        }

      </div>
      {/* <nav aria-label="Page navigation example">
        <ul class="pagination mt-4">
          {links}
        </ul>
      </nav> */}
    </div>
  )
}

export default AllProducts