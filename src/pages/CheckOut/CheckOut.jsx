import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const CheckOut = () => {
    const service = useLoaderData()
    const { title, _id, price, img } = service;
    const { user } = useContext(AuthContext);

    const handleCheckOut = event => {
        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const email = from.email.value;
        const date = from.date.value;
        const due = from.date.value;

        const checkOut = {
            customerName: name,
            email,
            date,
            price: price,
            service: title,
            img,
            service_id: _id
        }
        console.log(checkOut)
        fetch('http://localhost:5000/checkOuts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(checkOut)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                from.reset()
                if (data.acknowledged) {

                    Swal.fire(
                        'Checked Out Done',
                        'You clicked the button!',
                        'success')
                }
            })
    }

    return (
        <div>
            <h2>Check Out service: {title} </h2>

            <form onSubmit={handleCheckOut}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' defaultValue={user?.email} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date' className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name='due' defaultValue={'$' + price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Proceed To CheckOut" />
                </div>
            </form>

        </div>
    );
};

export default CheckOut;