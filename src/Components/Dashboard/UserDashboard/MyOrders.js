import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';


const MyOrders = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const email = user?.email;
    const { data: products, isLoading, refetch } = useQuery(['products', user], () => fetch(`http://localhost:5000/my-order/${email}`, {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 403 || res.status === 401) {
            signOut(auth);
            navigate('/login');
            localStorage.removeItem('accessToken');
            toast.error('Forbidden Access');
        }
        return res.json();
    }))


    const handleDelete = (id) => {

        swal({
            title: "Are you sure to delete?",
            text: `Order ID: ${id}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/my-order/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                toast.success('Item deleted successfully');
                                refetch();
                            }
                            else {
                                toast.error('Fail to delete item')
                            }
                        })

                }
            });

        return;

    }

    return (
        <div className='mx-auto'>
            <div className='text-center font-bold text-xl my-5'>
                <p className='text-sm'>Order History</p>
            </div>



            {
                products?.lenght < 1 ? <p className='text-center text-lg my-12'>No product to review</p> :
                    <div className="overflow-x-auto">
                        <table className="table table-compact lg:w-[1000px] font-semibold">

                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>ID</th>
                                    <th colSpan={1}>Order Time</th>
                                    <th >Item(s)</th>
                                    <th>Status</th>
                                    <th>Total Price ($)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    isLoading ? <Loading /> :
                                        [...products]?.reverse()?.map((product, index) =>
                                            <tr key={product?._id}>
                                                <td>{index + 1}</td>
                                                <td >{product?._id}</td>
                                                <td>{product?.dateTime}</td>
                                                <td>{product?.items?.length}</td>
                                                <td className="badge badge-success mt-2 badge-sm">{product?.orderStatus}</td>
                                                <td>{product.total}</td>
                                                <td><>
                                                    <span className='text-green-500'><Link to={`/dashboard/my-order-details/${product?._id}`}>Details</Link></span> | <span onClick={() => handleDelete(product?._id)} className='text-red-500 cursor-pointer'>Delete</span>
                                                </></td>
                                            </tr>
                                        )

                                }



                            </tbody>
                        </table>
                    </div>
            }


        </div>


    );
};

export default MyOrders;