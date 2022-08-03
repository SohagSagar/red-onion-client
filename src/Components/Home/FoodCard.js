import React from 'react';
import { TbCurrencyDollar } from 'react-icons/tb';

const FoodCard = ({food}) => {
    const {name,price,description,imageURL} = food;
    return (
        <div class="card w-80 h-[380px] bg-base-100 food-card text-center mt-10 cursor-pointer">
            <figure><img className='w-44 mt-10' src={imageURL} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class=" font-semibold">{name}</h2>
                <p className='text-gray-500 leading-none'>{description}</p>
                <div className='text-lg'><p className=' font-semibold '><TbCurrencyDollar className='inline text-[22px] mb-1 ' />{price}.<span>00</span></p></div>

            </div>
        </div>
    );
};

export default FoodCard;