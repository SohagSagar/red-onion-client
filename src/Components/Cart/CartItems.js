import React from 'react';
import { removeFromLocalStroage } from './CartInLocalStroage';

const CartItems = ({ cartItem,refreshCart, setRefreshCart }) => {

    if (!cartItem) {
        return;
    }
    const { _id,name, price, imageURL,quantity } = cartItem;

    const handleRemoveCartItem = (_id) => {
        removeFromLocalStroage(_id);
        setRefreshCart(!refreshCart)
    }
    return (
        <div className='flex justify-between items-center rounded-lg border px-1 my-2'>
            <div className='flex justify-start items-center gap-10'>
                <img className='w-10 rounded' src={imageURL} alt="food_image" />
                <div>
                    <p>{name}</p>
                    <p>$<span>{price}</span><small className='text-gray-500'> x {quantity}</small></p>
                </div>
            </div>
            <button onClick={() => handleRemoveCartItem(_id)} className="btn btn-error btn-sm font-semibold text-white">X</button>

        </div>
    );
};

export default CartItems;