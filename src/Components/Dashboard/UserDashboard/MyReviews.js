import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import {  useNavigate } from 'react-router-dom';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';
import MyReviewCard from './MyReviewCard';

const MyReviews = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const { data: reviews, isLoading, refetch } = useQuery(['user-review', user], () => fetch(`http://localhost:5000/user-review/${email}`,{
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

    return (
        <div className='mx-auto pb-5'>
            <div className='text-center font-bold text-xl my-5'>
                <p className='text-sm'>My Review(s)</p>
            </div>

            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-5 items-center justify-items-center'>
                {
                    isLoading ? <Loading /> :
                        reviews?.map(review =>
                            <MyReviewCard
                                key={review._id}
                                review={review}
                                refetch={refetch}
                            ></MyReviewCard>
                        )
                }
            </div>


        </div>
    );
};

export default MyReviews;