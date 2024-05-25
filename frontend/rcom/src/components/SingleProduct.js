import React from 'react'
import logo from "../logo.svg"
import { Link } from 'react-router-dom'
function SingleProduct(props) {
    return (

        <div className='col-12 col-md-3'>
            <div className="card mt-3">
                {
                    props.product.product_image && <img src={props.product.product_image[0].image} className="card-img-top" alt="..." />
                }
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/product/${props.product.id}`}>{props.product.title}</Link></h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price: {props.product.price}</li>
                </ul>
                <div className="card-body">
                    <Link to={`/product/${props.product.id}`}><button title="add to cart" className='btn btn-success btn-sm'><i class="fa-solid fa-cart-shopping"></i></button></Link>
                    <button title="add to wishlist" className='btn btn-danger btn-sm ms-2'><i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>

    )
}

export default SingleProduct