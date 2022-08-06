import React from 'react';
import { AiOutlineSmallDash } from 'react-icons/ai';

const Testimonials = () => {
    return (
        <div className='lg:px-12 text-accent pb-10'>
            <div className='flex justify-center items-center text-xl font-semibold'>
                <div className='text-5xl text-primary'><AiOutlineSmallDash /></div>
                <div className='mx-2'>Testimonials</div>
                <div className='text-5xl text-primary'><AiOutlineSmallDash /></div>
            </div>

            <div class=" w-96 bg-base-100 border-2  rounded-xl">
                <div class="card-body">
                    <div class="avatar mx-auto mt-[-80px] z-100  ">
                        <div class="w-24 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-2">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <div className='mx-auto'>
                        <p className='text-center font-semibold'>Sohag Sagar</p>
                        <p className='text-gray-500 text-center text-sm leading-none'>An Enginner</p>
                    </div>
                    <p className='break-all text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae commodi praesentium, dignissimos ex vitae laudantium pariatur sapiente cum autem expedita!</p>

                    <div class="rating rating-sm mx-auto gap-2">
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400"  />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked/>
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;