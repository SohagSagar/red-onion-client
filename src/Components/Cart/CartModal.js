import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';

const CartModal = ({ cartItems,setCartModalStatus,refreshCart ,setRefreshCart }) => {
    return (
        <div>
            <input type="checkbox" id="cartModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle xs:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center mb-3">Added Items</h3><hr />
                    {
                        !cartItems?.length && <p className='text-center my-5 text-red-500'>Cart is empty</p>
                    }
                    {
                        cartItems?.map(cartItem => <CartItems
                            key={cartItem?._id}
                            cartItem={cartItem}
                            refreshCart={refreshCart} 
                            setRefreshCart={setRefreshCart}
                        ></CartItems>)
                    }
                    <div className="modal-action flex justify-center ">
                        <label onClick={()=>setCartModalStatus(false)} htmlFor="cartModal" disabled={!cartItems?.length} className="btn btn-sm normal-case font-semibold"><Link to={'/checkout'}>Review Order</Link></label>

                        <label htmlFor="cartModal" className="btn btn-sm normal-case btn-error text-white font-semibold">Close Cart</label>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;