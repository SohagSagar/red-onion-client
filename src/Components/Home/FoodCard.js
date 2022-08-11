import React from 'react';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
    const { _id, name, price, description, imageURL } = food;
    const navegate = useNavigate()

    const foodDetails = (_id) => {
        navegate(`/food-details/${_id}`)
    }
    return (
        <div  onClick={() => foodDetails(_id)} className="card w-80 h-[380px] bg-base-100 food-card text-center mt-10 cursor-pointer">
            <figure><img className='w-44 mt-10' src={imageURL} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className=" font-semibold">{name}</h2>
                <p className='text-gray-500 leading-none'>{description}</p>
                <div className='text-lg'><p className=' font-semibold '><TbCurrencyDollar className='inline text-[22px] mb-1 ' />{price}.<span>00</span></p></div>

            </div>
        </div>
    );
};

export default FoodCard;