import React from 'react'
import Sidebar from './Sidebar'

const Orders = () => {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-3'>
                    <Sidebar />
                </div>
                <div className='col-9'>
                    <table className="table table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>ID.</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Oppo</td>
                                <td>13000</td>
                                <td>Accepted</td>
                                <td>Download</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Nokia</td>
                                <td>11000</td>
                                <td>Packed</td>
                                <td>Download</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders