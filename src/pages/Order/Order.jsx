import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import OrderRow from './OrderRow';
import Swal from 'sweetalert2';

const Order = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const url = `https://car-doctor-server-roan-six.vercel.app/checkOuts?email=${user.email}`
    useEffect(() => {
        fetch(url,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-secret-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [url])

    const handleDelate = id => {
        const confirm = Swal.fire({
            title: 'Are you sure Delete This?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://car-doctor-server-roan-six.vercel.app/checkOuts/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Service  deleted SuccessFully ',
                                'success'
                            )
                            const reaming = orders.filter(order => order._id !== id);
                            setOrders(reaming);
                        }
                    })

            }
        })

    }

    const handleUpdate = id => {
        fetch(`https://car-doctor-server-roan-six.vercel.app/checkOuts/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    Swal.fire(
                        'Update SuccessFully!',
                        'You clicked the button!',
                        'success'
                    )
                    const reaming = orders.filter(order => order._id !== id);
                    const Update = orders.find(order => order._id === id);
                    Update.status = 'confirm'
                    const newOrders = [update, ...reaming];
                    setOrders(newOrders)
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Service</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                orderRow={order}
                                handleDelate={handleDelate}
                                handleUpdate={handleUpdate}
                            ></OrderRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Order;