import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';

const CartModal = ({ cartItems,setCartModalStatus }) => {
    return (
        <div>
            <input type="checkbox" id="cartModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg text-center mb-3">Added Items</h3><hr />
                    {
                        !cartItems?.length && <p className='text-center my-5 text-red-500'>Cart is empty</p>
                    }
                    {
                        cartItems?.map(cartItem => <CartItems
                            key={cartItem?._id}
                            cartItem={cartItem}
                        ></CartItems>)
                    }
                    <div className="modal-action flex justify-center ">
                        <label onClick={()=>setCartModalStatus(false)} for="cartModal" disabled={!cartItems?.length} className="btn btn-sm normal-case font-semibold"><Link to={'/checkout'}>Review Order</Link></label>

                        <label for="cartModal" className="btn btn-sm normal-case btn-error text-white font-semibold">Close Cart</label>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;