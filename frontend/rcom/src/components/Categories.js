import React, { useEffect, useState } from 'react'
import SingleCategory from './SingleCategory'


export const Categories = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    fetch('http://127.0.0.1:8000/categories/')
      .then((response) => response.json())
      .then((data) => {
        setCategory(data)
        console.log(data)
        // setTotal(data.count)
      })
  }, [])
  return (
    <div className="container">
      <h3 className="mt-3">All Categories</h3>
      <div className='row'>
      {
          category.map((product) => <SingleCategory ctg={product} />)
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
