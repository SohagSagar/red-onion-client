import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const { data: products, isLoading } = useQuery(['products', user], () => fetch(`http://localhost:5000/my-order/${email}`).then(res => res.json()));


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
                                        [...products].reverse()?.map((product, index) =>
                                            <tr key={product?._id}>
                                                <td>{index + 1}</td>
                                                <td >{product?._id}</td>
                                                <td>{product?.dateTime}</td>
                                                <td>{product?.items?.length}</td>
                                                <td className="badge badge-success mt-2 badge-sm">{product?.orderStatus}</td>
                                                <td>{product.total}</td>
                                                <td><>
                                                <span className='text-green-500'><Link to={`/dashboard/my-order-details/${product?._id}`}>Details</Link></span> | <span>Delete</span>
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