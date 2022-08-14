import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import swal from 'sweetalert';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';

const GetAllUser = () => {
    const navigate = useNavigate()
    const { data: allUsers, isLoading, refetch } = useQuery(['all-users'], () => fetch(`https://vast-wave-53666.herokuapp.com/all-user`, {
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
                    fetch(`https://vast-wave-53666.herokuapp.com/user/${id}`, {
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
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className='mx-auto'>
            <Helmet><title>All Users - Red Onion</title></Helmet>
            <div className='text-center font-bold text-xl my-5'>
                <p className='text-sm'>Order History</p>
            </div>

            {
                allUsers?.lenght < 1 ? <p className='text-center text-lg my-12'>No product to review</p> :
                    <div className="overflow-x-auto">

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
                                    isLoading ?  <tr><td colSpan="4"><Loading /></td></tr> :
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