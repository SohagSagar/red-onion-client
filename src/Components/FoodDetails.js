import React, { useEffect, useState } from 'react';
import '../Styles/FoodDetails.css'
import food from '../resources/breakfast1.png';
import { TbCurrencyDollar } from 'react-icons/tb';
import { BsCart } from 'react-icons/bs';
import { async } from '@firebase/util';

const FoodDetails = () => {
    const [foodQuantity, setFoodQuantity] = useState(1);
    const [foodPrice, setFoodPrice] = useState(1);
    const price=55;
    console.log(foodPrice);
    const minus = () => {
        if (foodQuantity < 2) {
            alert("Quantity Cannot be 0");
            // alert("Hello world!");
        } else {
            setFoodQuantity(foodQuantity - 1)

        }
    }

    const plus = () => {
        setFoodQuantity(foodQuantity + 1);
    }
    useEffect(() => {
        setFoodPrice(foodQuantity * price);
        console.log(foodQuantity);
    }, [foodQuantity]);


    return (
        <div className='lg:px-12 food-details-container'>
            <div className="left-container">
                <h2>Light Breakfast</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima placeat nihil fugit ex veniam aliquam molestiae beatae obcaecati totam iure.</p>

                <div className="price flex items-center mt-5">
                    <h3 className='text-2xl font-semibold'><span><TbCurrencyDollar className='inline-block mb-1 mr-[-4px]' /></span>{foodPrice}</h3>
                    <button className='btn btn-white quantity-btn w-28 rounded-full ml-5 text-xl'><span onClick={minus} className='mr-3 text-3xl text-primary'>-</span>{foodQuantity}<span onClick={plus} className='ml-3 text-3xl text-primary'>+</span></button>
                </div>

                <button className='btn btn-primary rounded-full mt-8 w-36 text-xl'><span><BsCart className='mr-2'/></span>Add</button>
            </div>

            <div className="right-container">
                <img src={food} alt="" srcset="" />
            </div>
        </div>
    );
};

export default FoodDetails;