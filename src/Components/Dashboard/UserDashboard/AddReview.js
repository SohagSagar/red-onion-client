import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import toast from 'react-hot-toast';
import auth from '../../../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AddReview = () => {
    const [user, userLoading] = useAuthState(auth);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [dataLoading, setDataLoading] = useState(false);
    const dateTime = new Date().toLocaleString();
    const navigate = useNavigate()
    const requiredMessage = 'field is required';

    //handle form data to sent to the database
    const onSubmit = data => {
        const addReview = {
            ...data,
            email:user?.email,
            name:user?.displayName,
            imageURL:user?.photoURL,
            postOn:dateTime,
            status:'Inactive'

        }
        console.log(addReview);
        

        setDataLoading(true)
        fetch('https://vast-wave-53666.herokuapp.com/user-review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addReview)
        })
            .then(res =>{
                if (res.status === 403 || res.status === 401) {
                    signOut(auth);
                    navigate('/login');
                    localStorage.removeItem('accessToken');
                    toast.error('Forbidden Access');
                }
                return res.json();
            })
            .then(data => {
                data?.insertedId ? toast.success('Review Added successfully') : toast.error('Fail to add review');
                setDataLoading(false);
                reset();
            })




    }
    return (
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className="rounded-md lg:w-96 xs:w-80  mx-auto bg-base-100 shadow-md mt-2 ">
            <Helmet><title>Add Review - Red Onion</title></Helmet>
            <div className="card-body">
                <h2 className="text-xl font-semibold text-center ">Add Review</h2><hr />

                <form onSubmit={handleSubmit(onSubmit)} >

                    {/* profession  name */}
                    <label className="label  pb-0">
                        <span className="label-text">Profession Name</span>
                    </label>
                    <input {...register('profession', {
                        required: {
                            value: true,
                            message: requiredMessage
                        },
                        pattern: {
                            value: /^[a-zA-Z\s]*$/g,
                            message: 'Only text is allowed'
                        }
                    })} type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-xs" />
                    <label className="label py-0">
                        {
                            errors?.profession && <span className="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.profession.message}</span>
                        }
                    </label>

                    {/* ratings  */}
                    <label className="label  pb-0">
                        <span className="label-text">Ratings</span>
                    </label>
                    <select {...register('rating', {
                        required: {
                            value: true,
                            message: 'No rating is selected'
                        }
                    })} className="select select-bordered select-sm w-full max-w-xs ">
                        <option hidden></option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                    </select>
                    <label className="label pt-0">
                        {
                            errors.rating && <span className="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.rating.message}</span>
                        }

                    </label>


                    {/* your reviews  */}
                    <div className="form-control">
                        <label className="label pb-0">
                            <span className="label-text">Review</span>
                        </label>
                        <textarea {...register('review', {
                            required: {
                                value: true,
                                message: requiredMessage
                            }
                        })} className="textarea textarea-bordered h-24" placeholder="Write Your Review..."></textarea>
                    </div>

                    <label className="label pt-0">
                        {
                            errors?.review && <span className="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.review.message}</span>
                        }
                    </label>


                    <div className="card-actions justify-center  mt-5">
                        <button disabled={userLoading} type='submit' className={`btn btn-primary rounded-full w-full normal-case font-semibold ${dataLoading && 'loading'}`}>{!dataLoading && 'Submit Review'}</button>
                    </div>

                </form>


            </div>
        </div>
    );
};

export default AddReview;