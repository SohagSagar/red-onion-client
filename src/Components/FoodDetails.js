import React, { useEffect, useState } from 'react';
import '../Styles/FoodDetails.css'
import { TbCurrencyDollar } from 'react-icons/tb';
import { BsCart } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToLocalStroage } from './Cart/CartInLocalStroage';


const FoodDetails = ({ cartItems, setCardItems }) => {

    const { id } = useParams();
    const [foodQuantity, setFoodQuantity] = useState(1);
    const [foodPrice, setFoodPrice] = useState(1);
    const [targetFood, setTargetFood] = useState({});
    

    const handleAddToCart = (targetFood) => {
        const existInCart = cartItems.find(items => items._id === targetFood._id)

        if (!existInCart) {
            const itemAddedToCart = [...cartItems, targetFood];
            setCardItems(itemAddedToCart)
            addToLocalStroage(targetFood._id, foodQuantity);
            toast.success('Item added to cart');
        } else {
            toast.error('Item is Already Added In Cart !!');
        }
    }


    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(`http://localhost:5000/food-details/${id}`);
            // convert the data to json
            const json = await data.json();

            // set state with the result
            setTargetFood(json);
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [id]);


    const { name, price, imageURL, description } = targetFood;
    const minus = () => {
        foodQuantity < 2 ? alert("Quantity Cannot be 0") : setFoodQuantity(foodQuantity - 1);
    }

    const plus = () => {
        setFoodQuantity(foodQuantity + 1);
    }
    useEffect(() => {
        setFoodPrice(foodQuantity * price);
    }, [foodQuantity, price]);


    return (

        <div className='lg:px-12 food-details-container'>
            <div className="left-container">
                <h2>{name}</h2>
                <p>{description}.</p>

                <div className="price flex items-center mt-5">
                    <h3 className='text-2xl font-semibold'><span><TbCurrencyDollar className='inline-block mb-1 mr-[-4px]' /></span>{foodPrice}</h3>
                    <p className='btn btn-white quantity-btn w-28 rounded-full ml-5 text-xl border-primary'><span onClick={minus} className='mr-3 text-3xl text-primary'>-</span>{foodQuantity}<span onClick={plus} className='ml-3 text-3xl text-primary'>+</span></p>
                </div>

                <button onClick={() => handleAddToCart(targetFood)} className='btn btn-primary rounded-full mt-8 w-36 text-xl'><span><BsCart className='mr-2' /></span>Add</button>
            </div>

            <div className="right-container">
                <img className='pb-5' src={imageURL} alt="" srcset="" />
            </div>
        </div>



    );
};

export default FoodDetails;