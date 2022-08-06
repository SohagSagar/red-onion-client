import React from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
const MyReviewCard = ({ review, refetch }) => {
    const { _id, name, profession, imageURL, rating, postOn, review: userReview } = review;
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
            })


    }

    return (
        <div class=" w-96 h-52 bg-base-100 border-2 border-primary  rounded-xl mt-20 mx-auto">
            <div class="card-body pb-2">
                <div class="avatar mx-auto mt-[-80px] z-100  ">
                    <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={imageURL} alt={'reviewer_image'} />
                    </div>
                </div>
                <div className='mx-auto'>
                    <p className='text-center font-semibold'>{name}</p>
                    <p className='text-gray-500 text-center text-xs text-sm leading-none'>({profession})</p>
                </div>
                <p className='break-all text-gray-600'>{userReview}</p>

                <div class="rating rating-sm mx-auto gap-2 mb-0">

                    {
                        parseInt(rating) === 5 ?
                            <>
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />

                            </> :

                            parseInt(rating) === 4 ?
                                <>
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                </> :

                                parseInt(rating) === 3 ?
                                    <>
                                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                    </> :

                                    parseInt(rating) === 2 ?
                                        <>
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                        </> :
                                        <>
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" />
                                        </>
                    }

                </div>

                <small className='mt-5 text-gray-400 text-center'>Posted on {postOn}</small>
            </div>
            <button onClick={() => handleDeleteReview(_id)} class="btn btn-sm btn-primary text-white w-full rounded-full btn-wide mt-2 ">Remove</button>
        </div>
    );
};

export default MyReviewCard;