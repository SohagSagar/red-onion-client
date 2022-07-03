import React from 'react';
import food from '../../resources/breakfast1.png';
import { TbCurrencyDollar } from 'react-icons/tb';
import '../../Styles/FoodSection.css';

const FoodSection = () => {
    return (
        <div className='lg:px-12 text-accent py-12'>
            <div className='flex justify-center items-center '>
                <p className='px-5'>Breakfast</p>
                <p className='px-5'>Lunch</p>
                <p className='px-5'>Dinner</p>
            </div>

            <div class="card w-96 bg-base-100 food-card text-center mt-10 cursor-pointer">
                <figure><img className='w-44 mt-10' src={food} alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class=" font-semibold">Egges Benedict</h2>
                    <p className='text-gray-500 leading-none'>How we dream about our future</p>
                    <div className='text-lg'><p className=' font-semibold '><TbCurrencyDollar className='inline text-[22px] mb-1 '/>8.<span>999</span></p></div>



                </div>
            </div>
        </div>
    );
};

export default FoodSection;