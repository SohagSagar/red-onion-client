import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../SharedComponents/Loading';

const MyOrderDetails = () => {
    const { id } = useParams();
    console.log(id);
    const { data: orderItems, isLoading,error } = useQuery(['item-details',id], () => fetch(`http://localhost:5000/my-order-details/${id}`,{
        headers:{
            'authorization':`Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    console.log(error);

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log('orderItems', orderItems?.items);
    

    let total = 0;
    orderItems?.items?.map(orderItem => <>
        {
            total = total + parseInt(orderItem?.price * orderItem?.quantity)
        }
    </>);

    
    return (
        <div className='min-h-screen lg:px-12'>
            <div className='lg:w-[800px] mx-auto border rounded-lg mt-10'>
                <p className="text-xl font-semibold text-center">Order Details</p><hr />
                {
                    !orderItems?.items?.length | orderItems===null ? <p className='text-center text-lg my-12'>No product to review</p> :

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
                                        orderItems?.items?.map(orderItem =>
                                            <tr key={orderItem._id}>

                                                <td><img className='w-16 rounded-lg' src={orderItem?.imageURL} alt="" srcset="" /></td>
                                                <td>{orderItem.name}</td>
                                                <td>{orderItem.quantity}</td>
                                                <td>{orderItem.price * orderItem.quantity}</td>

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


        </div >
    );
};

export default MyOrderDetails;