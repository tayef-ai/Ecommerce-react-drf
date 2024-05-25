import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-3'>
                    <Sidebar />
                </div>
                <div className='col-9'>
                    <div className='row'>
                        <div className='col-4'>
                            <div class="card">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Total Orders</h5>
                                    <p class="card-text">103</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div class="card">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Total Wishlist</h5>
                                    <p class="card-text">55</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Address</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard