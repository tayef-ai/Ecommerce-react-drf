import React, { useEffect, useState } from 'react'

export const PlacedOrder = () => {
    const [message, setMessage] = useState('');
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cust_email = localStorage.getItem('customer_email')
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const urls = [
                    `http://127.0.0.1:8000/paymentdone/?email=${cust_email}`,
                    `http://127.0.0.1:8000/orders/?email=${cust_email}`
                ];

                const [response1, response2] = await Promise.all(urls.map(url => fetch(url)));

                if (!response1.ok || !response2.ok) {
                    throw new Error('Network response was not ok');
                }

                const data1 = await response1.json();
                const data2 = await response2.json();

                setMessage(data1.msg);
                setData(data2);
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [message]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const orderCancel = (oid) => {
        fetch(`http://127.0.0.1:8000/cancelorder/?id=${oid}`)
        .then((request) => request.json())
        .then((data) => {
            setMessage(data.msg)
        })
    }
    console.log(Data)
    return (
        <div className='container mt-5'>
            <div className='alert alert-success text-center'>{message}</div>
            {
                Data?.map((md, key) =>
                    <div className='row shadow-sm'>
                        <div className='col-1'>
                            <img className='img-fluid img-thumbnail' src={md.product?.product_image[0]?.image} />
                        </div>
                        <div className='col-7'>
                            <p>
                                <b>Product: </b>{md.product.title}<br/>
                                <b>Quantity: </b>{md.quantity}<br/>
                                <b>Price: </b>{md.product.price}<br/>
                                <b>Order Date: </b>{md.order_date}<br/>
                                <button className='btn btn-sm btn-danger' onClick={() => orderCancel(md.id)}>Cancel Order</button><br/>
                            </p>
                        </div>
                        <div className='col-4'>
                            <b>Order Status: </b>{md.status}
                        </div>
                    </div>
                )
            }
        </div>

    )
}

