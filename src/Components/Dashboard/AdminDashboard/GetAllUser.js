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
import { async } from '@firebase/util';

const GetAllUser = () => {
    const navigate = useNavigate()
    const [orderStatus, setOrderStatus] = useState('all-orders');
    const { data: allUsers, isLoading, refetch } = useQuery(['all-users', orderStatus], () => fetch(`http://localhost:5000/all-user`, {
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

    const handleChangeStatus = async (id, orderStatus) => {

        await fetch(`http://localhost:5000/change-status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ orderStatus })
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    signOut(auth);
                    navigate('/login');
                    localStorage.removeItem('accessToken');
                    toast.error('Forbidden Access');
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Status changed');
                    refetch();
                } else {
                    toast.error('Fail to change status');
                }
            })

    }


    const handledelete = (id) => {

        swal({
            title: "Are you sure to delete?",
            text: `Order ID: ${id}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/user/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },

                    })
                        .then(res => {
                            if (res.status === 403 || res.status === 401) {
                                signOut(auth);
                                navigate('/login');
                                localStorage.removeItem('accessToken');
                                toast.error('Forbidden Access');
                            }
                            return res.json();
                        })
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
                allUsers?.lenght < 1 ? <p className='text-center text-lg my-12'>No product to review</p> :
                    <div className="overflow-x-auto">
                        {/* <div className='flex justify-start'>
                            < div className='flex items-center gap-2'>
                                <p className='text-md font-semibold'>Filter: </p>
                                <select onChange={(e) => setOrderStatus(e.target.value)} class="select select-bordered select-sm w-full max-w-xs onFo">
                                    <option value={'all-orders'}>All</option>
                                    <option value={'Processing'} >Processing</option>
                                    <option value={'Shipped'}>Shipped</option>
                                    <option value={'Canceled'}>Canceled</option>
                                </select>
                            </div>
                        </div> */}
                        <table className="table table-compact lg:w-[1000px] font-semibold ">

                            <thead >
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th colSpan={1}>Email</th>
                                    <th >Last Logged</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    isLoading ? <Loading /> :
                                        [...allUsers]?.reverse()?.map((user, index) =>
                                            <tr key={user?._id}>
                                                <td>{index + 1}</td>
                                                
                                                <td>{user?.name}</td>
                                                <td>{user?.email}</td>
                                                <td>{user?.lastLogged}</td>
                                                <td><>
                                                    <span onClick={() => handledelete(user?._id)} className='text-red-500 cursor-pointer'>Delete</span>
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

export default GetAllUser;