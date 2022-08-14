import React, { useEffect, useState } from 'react';
import '../Styles/FoodDetails.css'
import { TbCurrencyDollar } from 'react-icons/tb';
import { BsCart } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToLocalStroage } from './Cart/CartInLocalStroage';
import { Helmet } from 'react-helmet-async';


const FoodDetails = ({ cartItems, setCardItems,refreshCart,setRefreshCart}) => {

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
            setRefreshCart(!refreshCart)
        } else {
            toast.error('Item is Already Added In Cart !!');
        }
    }


    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(`https://vast-wave-53666.herokuapp.com/food-details/${id}`);
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

        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className='lg:px-12 food-details-container xs:pb-5'>
            <Helmet><title>Food Details - Red Onion</title></Helmet>
            <div className="left-container">
                <h2 className=''>{name}</h2>
                <p>{description}.</p>

                <div className="price flex items-center mt-5">
                    <h3 className='lg:text-2xl xs:text-xl font-semibold'><span><TbCurrencyDollar className='inline-block mb-1 mr-[-4px]' /></span>{foodPrice}</h3>
                    <p className='btn lg:btn-md xs:btn-sm btn-white quantity-btn w-28  rounded-full ml-5 text-xl border-primary'><span onClick={minus} className='mr-3 xs:text-lg lg:text-3xl text-primary'>-</span>{foodQuantity}<span onClick={plus} className='ml-3 xs:text-lg lg:text-3xl text-primary'>+</span></p>
                </div>

                <button onClick={() => handleAddToCart(targetFood)} className='btn xs:btn-sm lg:btn-lg btn-primary rounded-full lg:mt-8 xs:mt-4 lg:w-36 xs:w-44 lg:text-xl xs:text-sm'><span><BsCart className='mr-2' /></span>Add</button>
            </div>

            <div className="right-container">
                <img className='pb-5' src={imageURL} alt="" srcSet="" />
            </div>
        </div>



    );
};

export default FoodDetails;