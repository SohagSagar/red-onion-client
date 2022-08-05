import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../Firebase/Firebase';
import { deleteShoppingCart } from '../Cart/CartInLocalStroage';
import Loading from '../SharedComponents/Loading';

const Checkout = ({ cartItems }) => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <Loading />
    }

    let total = 0;
    cartItems.map(cartItem => <>
        {
            total = total + parseInt(cartItem?.price * cartItem?.quantity)
        }
    </>);
    const dateTime = new Date().toLocaleString();



    const placeOrder = () => {
        const orderItems = {
            items: cartItems,
            total: total,
            dateTime: dateTime,
            orderStatus: "Processing",
            email: user?.email


        }
        console.log('object');

        fetch('http://localhost:5000/order-foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderItems)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Order place successfully')
                    deleteShoppingCart();
                    navigate('/dashboard/my-orders');

                }
                else {
                    toast.error('Fail to place order')
                }
            })


    }
    return (
        <div className='min-h-screen lg:px-12'>
            <div className='lg:w-[800px] mx-auto border rounded-lg mt-10'>
                <p className="text-xl font-semibold text-center">Orders Review</p><hr />
                {
                    !cartItems.length ? <p className='text-center text-lg my-12'>No product to review</p> :

                        <div className="overflow-x-auto my-5">
                            <table className="table w-full">
                                {/* <!-- head --> */}
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <!-- row 1 --> */}

                                    {
                                        cartItems.map(cartItem =>
                                            <tr key={cartItem._id}>

                                                <td><img className='w-16 rounded-lg' src={cartItem?.imageURL} alt="" srcset="" /></td>
                                                <td>{cartItem?.name}</td>
                                                <td>{cartItem.quantity}</td>
                                                <td>{cartItem?.price * cartItem.quantity}</td>

                                            </tr>
                                        )
                                    }
                                    < td colSpan={3} className='font-semibold'>Total Purchase Amount</td>
                                    <td colSpan={3} className='font-semibold'>{total}</td>

                                </tbody>
                            </table>
                        </div>

                }

            </div>
            {
                <button onClick={() => placeOrder()} disabled={cartItems?.length === 0} className="btn btn-success  btn-wide mx-auto flex justify-center mt-2">Place Order</button>
            }

        </div >
    );
};

export default Checkout;