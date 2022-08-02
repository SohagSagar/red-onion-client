import React from 'react';
import { MdError } from 'react-icons/md';

const AddFoods = () => {
    return (
        <div class="rounded-md w-96 mx-auto bg-base-100 shadow-md mt-2">
            <div class="card-body">
                <h2 class="text-xl font-semibold text-center ">Add Foods</h2><hr />

                <form >

                    {/* foods name */}
                    <label class="label  pb-0">
                        <span class="label-text">Food Name</span>
                    </label>
                    <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />
                    <label class="label py-0">
                        <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />Alt label</span>
                    </label>

                    {/* foods category */}
                    <label class="label  pb-0">
                        <span class="label-text">Category</span>
                    </label>
                    <select class="select select-bordered select-sm w-full max-w-xs ">
                        <option disabled selected>Select Food Category</option>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                    </select>
                    <label class="label pt-0">
                        <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />Alt label</span>
                    </label>

                    {/* foods price */}
                    <label class="label  pb-0">
                        <span class="label-text">Price</span>
                    </label>
                    <input type="number" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />

                    <label class="label pt-0">
                        <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />Alt label</span>
                    </label>

                    {/* foods descriptions */}

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
                        <textarea class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    
                    </div>

                    <label class="label pt-0">
                        <span class="label-text-alt text-rose-500"><MdError className='inline mb-1' />Alt label</span>
                    </label>

                </form>

                <div class="card-actions justify-center  ">
                    <button class="btn btn-primary rounded-full w-full normal-case font-semibold">Add Food</button>
                </div>
            </div>
        </div>
    );
};

export default AddFoods;