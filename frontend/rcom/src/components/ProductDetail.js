import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from "../logo.svg"
import { Link, useParams } from 'react-router-dom'

const ProductDetail = () => {
    const [message, setMessage] = useState('')
    const [product, setProduct] = useState('')
    const { product_id } = useParams()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/${product_id}/`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data)
                // console.log(data.product_image)
            })
    }, [])
    // if (!product.product_image) {
    //     return <span>Loading...</span>
    // }
    const addtocarthandler = (event) => {
        axios.get("http://127.0.0.1:8000/add-to-cart/", {
            params: {
                'email': localStorage.getItem('customer_email'),
                'product_id': product_id,
            }
        })
            .then((response) => {
                setMessage(response.data)
                console.log(response.data)
            })
    }
    return (
        <div className='container mt-4'>
            <h2>Product Details</h2>
            <div className="row">
                <div className="col-4">
                    {
                        product.product_image && <img className='img-fluid img-thumbnail shadow' src={product.product_image?.[0].image} alt={product.title} />
                    }
                </div>
                <div className="col-8">
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <h5>Brand: {product.brand}</h5>
                    <h6>Price: Tk. {product.price}</h6>
                    <button title="add to cart" className='btn btn-primary btn-sm' onClick={addtocarthandler}><i class="fa-solid fa-cart-shopping"></i>Add To Cart</button>
                    <button title="add to wishlist" className='btn btn-success btn-sm ms-2'><i class="fa-solid fa-bag-shopping"></i> Buy Now</button>
                    <button title="add to wishlist" className='btn btn-danger btn-sm ms-2'><i class="fa-solid fa-heart"></i> wishlist</button>
                    <div className='my-5'>
                        <h5>Tags</h5>
                        <Link to='#' className='badge bg-secondary me-1'>Tag1</Link>
                        <Link to='#' className='badge bg-secondary me-1'>Tag2</Link>
                        <Link to='#' className='badge bg-secondary me-1'>Tag2</Link>
                        <Link to='#' className='badge bg-secondary'>Tag2</Link>
                    </div>
                    <span className='text-danger'>{
                    message.msg && <b>{message.msg} <Link to='/checkout' className='btn btn-sm btn-warning'>Go To Cart</Link></b>
                    
                    }</span>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail