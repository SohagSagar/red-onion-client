import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';
import MyReviewCard from './MyReviewCard';

const MyReviews = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const { data: reviews, isLoading, refetch } = useQuery(['user-review', user], () => fetch(`http://localhost:5000/user-review/${email}`).then(res => res.json()));

    return (
        <div className='mx-auto pb-5'>
            <div className='text-center font-bold text-xl my-5'>
                <p className='text-sm'>My Review(s)</p>
            </div>

            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-5 items-center justify-items-center'>
                {
                    isLoading ? <Loading /> :
                        reviews.map(review =>
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