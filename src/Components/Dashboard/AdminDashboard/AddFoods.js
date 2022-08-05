import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { BiCloudUpload } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

const AddFoods = () => {
    const { register,reset, handleSubmit,formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataLoading,setDataLoading]=useState(false);


    const requiredMessage = 'field is required';
    // const capitalize = s => s && s[0].toUpperCase() + s.slice(1);
    // const result=capitalize(requiredMessage);


    //upload images to imagebb server
    const handleUploadImage = (event) => {
        const image = (event.target.files[0]);

        const formData = new FormData();
        formData.append('image', image);
        setLoading(true);
        setImageURL('');
        fetch('https://api.imgbb.com/1/upload?key=ca3a23b36ef2ec3a06a5f2ba99f6b1c1', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                data.status === 200 ? setImageURL(data?.data.display_url) : toast.error('Fail to upload image')
                setLoading(false);
            })
    }

    //handle form data to sent to the database
    const onSubmit = data => {
        const addIteamData = {
            ...data,
            imageURL: imageURL
        }
        setDataLoading(true)
        fetch('http://localhost:5000/add-food', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(addIteamData)
        })
            .then(res => res.json())
            .then(data => {
                data?.insertedId ? toast.success('Iteam inserted successfully') : toast.error('Fail to insert iteam');
                setDataLoading(false);
                reset();setImageURL('');

                
            })




    }
    return (
        <div class="rounded-md w-96 mx-auto bg-base-100 shadow-md mt-2">
            <div class="card-body">
                <h2 class="text-xl font-semibold text-center ">Add Foods</h2><hr />

                <form onSubmit={handleSubmit(onSubmit)} >

                    {/* foods name */}
                    <label class="label  pb-0">
                        <span class="label-text">Food Name</span>
                    </label>
                    <input {...register('name', {
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
                            errors?.name && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.name.message}</span>
                        }
                    </label>

                    {/* foods category */}
                    <label class="label  pb-0">
                        <span class="label-text">Category</span>
                    </label>
                    <select {...register('category', {
                        required: {
                            value: true,
                            message: 'No category is selected'
                        }
                    })} class="select select-bordered select-sm w-full max-w-xs ">
                        <option hidden></option>
                        <option value={'Breakfast'}>Breakfast</option>
                        <option value={'Lunch'}>Lunch</option>
                        <option value={'Dinner'}>Dinner</option>
                    </select>
                    <label class="label pt-0">
                        {
                            errors.category && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.category.message}</span>
                        }

                    </label>

                    {/* foods price */}
                    <label class="label  pb-0">
                        <span class="label-text">Price ($)</span>
                    </label>
                    <input {...register('price', {
                        required: {
                            value: true,
                            message: requiredMessage
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Expected positive integer'
                        }

                    })} type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />

                    <label class="label pt-0">
                        {
                            errors?.price && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.price.message}</span>
                        }
                    </label>

                    {/* foods descriptions */}

                    <div class="form-control">
                        <label class="label pb-0">
                            <span class="label-text">Description</span>
                        </label>
                        <textarea {...register('description', {
                            required: {
                                value: true,
                                message: requiredMessage
                            }
                        })} class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <label class="label pt-0">
                        {
                            errors?.description && <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />{errors.description.message}</span>
                        }
                    </label>


                    {/* foods image */}

                    <label htmlFor='image' class={`btn btn-sm btn-success rounded-full w-full text-white pb-0 normal-case ${loading && 'loading'}`}>
                        {imageURL ? <TiTick className='text-xl mr-1' /> : <BiCloudUpload className='text-xl mr-1' />}
                        {imageURL ? 'Image Uploaded' : <>{loading ? 'Uploading ...' : 'Upload Image'}</>}
                    </label>

                    <input hidden id='image' onChange={handleUploadImage} type="file" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />


                    <div class="card-actions justify-center  mt-5">
                        <button disabled={!imageURL} type='submit' class={`btn btn-primary rounded-full w-full normal-case font-semibold ${dataLoading && 'loading'}`}>{!dataLoading && 'Add Food'}</button>
                    </div>

                </form>


            </div>
        </div>
    );
};

export default AddFoods;