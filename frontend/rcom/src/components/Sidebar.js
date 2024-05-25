import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div class="list-group">
            <Link to="/dashboard" class="list-group-item list-group-item-action" aria-current="true">
                Dashboard
            </Link>
            <Link to="/orders" class="list-group-item list-group-item-action">Orders</Link>
            <Link to="/profile" class="list-group-item list-group-item-action">Profile</Link>
            <Link to="#" class="list-group-item list-group-item-action">Wishlist</Link>
            <Link to="/logout" class="list-group-item list-group-item-action">Logout</Link>
        </div>
    )
}

export default Sidebar