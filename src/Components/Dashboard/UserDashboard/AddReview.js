import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import toast from 'react-hot-toast';
import auth from '../../../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const [user, userLoading] = useAuthState(auth);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [dataLoading, setDataLoading] = useState(false);
    const dateTime = new Date().toLocaleString();
    const navigate = useNavigate()

    const requiredMessage = 'field is required';
    // const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
    // const result=capitalize(requiredMessage);

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
        fetch('http://localhost:5000/user-review', {
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
        <div class="rounded-md w-96 mx-auto bg-base-100 shadow-md mt-2">
            <div class="card-body">
                <h2 class="text-xl font-semibold text-center ">Add Review</h2><hr />

                <form onSubmit={handleSubmit(onSubmit)} >

                    {/* profession  name */}
                    <label class="label  pb-0">
                        <span class="label-text">Profession Name</span>
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
                    })} type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
                    <label class="label py-0">
                        {
                            errors?.profession && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.profession.message}</span>
                        }
                    </label>

                    {/* ratings  */}
                    <label class="label  pb-0">
                        <span class="label-text">Ratings</span>
                    </label>
                    <select {...register('rating', {
                        required: {
                            value: true,
                            message: 'No rating is selected'
                        }
                    })} class="select select-bordered select-sm w-full max-w-xs ">
                        <option hidden></option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                    </select>
                    <label class="label pt-0">
                        {
                            errors.rating && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.rating.message}</span>
                        }

                    </label>


                    {/* your reviews  */}
                    <div class="form-control">
                        <label class="label pb-0">
                            <span class="label-text">Review</span>
                        </label>
                        <textarea {...register('review', {
                            required: {
                                value: true,
                                message: requiredMessage
                            }
                        })} class="textarea textarea-bordered h-24" placeholder="Write Your Review..."></textarea>
                    </div>

                    <label class="label pt-0">
                        {
                            errors?.review && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.review.message}</span>
                        }
                    </label>


                    <div class="card-actions justify-center  mt-5">
                        <button disabled={userLoading} type='submit' class={`btn btn-primary rounded-full w-full normal-case font-semibold ${dataLoading && 'loading'}`}>{!dataLoading && 'Submit Review'}</button>
                    </div>

                </form>


            </div>
        </div>
    );
};

export default AddReview;