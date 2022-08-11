import React from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import auth from '../../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const MyReviewCard = ({ review, refetch }) => {
    const { _id, name, profession, imageURL, rating, postOn, review: userReview } = review;
    const navigate = useNavigate()
    const handleDeleteReview = (_id) => {
        swal({
            title: "Are you sure to delete?",
            text: `Order ID: ${_id}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/user-review/${_id}`, {
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
            })


    }

    return (
        <div className=" lg:w-96 xs:w-80 bg-base-100 border-2 border-primary rounded-xl mt-20 mx-auto">
            <div className="card-body pb-2  h-60">
                <div className="avatar mx-auto mt-[-80px] z-100  ">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={imageURL} alt={'reviewer_image'} />
                    </div>
                </div>
                <div className='mx-auto'>
                    <p className='text-center font-semibold'>{name}</p>
                    <p className='text-gray-500 text-center text-xs text-sm leading-none'>({profession})</p>
                </div>
                <p className='break-all text-gray-600'>{userReview}</p>

                <div className="rating rating-sm mx-auto gap-2 mb-0">

                    {
                        parseInt(rating) === 5 ?
                            <>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />

                            </> :

                            parseInt(rating) === 4 ?
                                <>
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                </> :

                                parseInt(rating) === 3 ?
                                    <>
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                    </> :

                                    parseInt(rating) === 2 ?
                                        <>
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                        </> :
                                        <>
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                        </>
                    }

                </div>

                <small className='mt-5 text-gray-400 text-center'>Posted on {postOn}</small>
            </div>
            <button onClick={() => handleDeleteReview(_id)} className="btn btn-sm btn-primary text-white w-full rounded-b-lg  rounded-t-none ">Remove</button>
        </div>
    );
};

export default MyReviewCard;