import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const UserReviews = () => {
    const navigate = useNavigate()
    const [status, setOrderStatus] = useState('all-review');
    const { data: userReviews, isLoading, refetch } = useQuery(['user-reviews', status], () => fetch(`https://vast-wave-53666.herokuapp.com/user-reviews/${status}`, {
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

    const handleChangeStatus = async (id, status) => {

        await fetch(`https://vast-wave-53666.herokuapp.com/review-status/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status: status })
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


    
    return (
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className='mx-auto'>
            <div className='text-center font-bold text-xl my-5'>
                <p className='text-sm'>Order History</p>
            </div>



            {
                userReviews?.lenght < 1 ? <p className='text-center text-lg my-12'>No product to review</p> :
                    <div className="overflow-x-auto">
                        <div className='flex justify-start'>
                            < div className='flex items-center gap-2'>
                                <p className='text-md font-semibold'>Filter: </p>
                                <select onChange={(e) => setOrderStatus(e.target.value)} className="select select-bordered select-sm w-full max-w-xs onFo">
                                    <option value={'all-review'}>All</option>
                                    <option value={'Active'} >Active</option>
                                    <option value={'Inactive'}>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <table className="table table-compact lg:w-[1000px] font-semibold ">

                            <thead >
                                <tr>
                                    <th>SL</th>
                                    <th>Reviewer</th>
                                    <th colSpan={1}>Post On</th>
                                    <th >Review</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    isLoading ?  <tr><td colSpan="4"><Loading /></td></tr> :
                                        [...userReviews]?.reverse()?.map((review, index) =>
                                            <tr key={review?._id}>
                                                <td>{index + 1}</td>
                                                <td >{review?.name}</td>
                                                <td>{review?.postOn}</td>

                                                <td>
                                                    <textarea readOnly defaultValue={review?.review} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                                                </td>
                                                <td>
                                                    <span className={`badge  py-2 mt-2 badge-md ${review.status === 'Inactive' ? 'badge-error' : 'badge-success'} `}>
                                                        {review.status}</span>
                                                </td>

                                                <td>
                                                    {
                                                        review.status === 'Inactive' ?
                                                            <button onClick={() => (handleChangeStatus(review._id, 'Active'))} className='text-whitecursor-pointer btn-success  btn btn-xs rounded-full normal-case'>Make Active</button>
                                                            :
                                                            <button onClick={() => (handleChangeStatus(review._id, 'Inactive'))} className='cursor-pointer btn-success btn btn-xs rounded-full normal-case'>Make Inactive</button>
                                                    }

                                                </td>
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

export default UserReviews;