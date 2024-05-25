import React from 'react'
import { Link } from 'react-router-dom'

const SingleCategory = (props) => {
  return (
    <div className='col-12 col-md-3'>
    <div className="card mt-3">
        <div className="card-body">
            <h5 className="card-title"><Link to={`/category/${props.ctg.id}`}>{props.ctg.categoryname}</Link></h5>
            <p className="card-text">{props.ctg.detail}</p>
        </div>
    </div>
</div>
  )
}

export default SingleCategory