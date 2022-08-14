import React, { useEffect, useState } from 'react';
import '../../Styles/Navbar.css';
import logo from '../../resources/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import CartModal from '../Cart/CartModal';
import { getStoredCart } from '../Cart/CartInLocalStroage';


const Navbar = ({ cartItems, setCardItems,refreshCart, setRefreshCart }) => {
    const [user] = useAuthState(auth);
    const [cartModalStatus, setCartModalStatus] = useState(true)
    const navigate = useNavigate();


    const [products, setProducts] = useState([])

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(`http://localhost:5000/food-items`);
            // convert the data to json
            const json = await data.json();

            // set state with the result
            setProducts(json);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])


    useEffect(() => {
        const storedCart = getStoredCart();
        let addedProduct = {};
        let savedCart = [];
        if (products) {
            for (const id in storedCart) {
                addedProduct = products?.find(product => product._id === id);

                if (addedProduct) {
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
            }
        }
        
        setCardItems(savedCart);

    }, [products,refreshCart]);




    //sign out user
    const signout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
        toast.success('Signout successfully');
        navigate('/login');

    }


    // if (loading) {
    //     return <Loading />
    // }

    const menu = <>
        {
            user && <li className='px-10 text-accent italic lg:block xs:hidden'> Welcome {user?.displayName} </li>
        }

        <label onClick={()=>setCartModalStatus(true)} htmlFor="cartModal" className=' text-accent cursor-pointer xs:py-2 lg:py-0'> Cart <sup className='p-1 text-primary sm:text-sm lg:text-lg'>{cartItems?.length}</sup></label>


        {
            !user ? <Link className='lg:px-5 xs:pb-2 lg:pb-0' to="/login">Login</Link> :
                <Link className='lg:px-5 xs:pb-3' to="/dashboard">Dashboard</Link>
        }

        {
            user ? <li><button onClick={() => signout()} className="btn btn-sm text-secondary rounded-full bg-primary border-0 normal-case px-7 pt-2 xs:pb-2 lg:pb-0'">Sign out</button></li> :
                <li><button className="btn btn-sm text-secondary rounded-full bg-primary border-0 normal-case px-7 pt-2  xs:pb-5 lg:pb-0'"><Link to="/signup">Signup</Link></button></li>
        }


    </>
    return (
        <div className="lg:px-12 navbar font-semibold bg-transparent">
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ">
                        {menu}
                    </ul>
                </div>

                <Link to={'/'} className="btn btn-ghost normal-case text-xl"><img className='w-36' src={logo} alt="" srcSet="" /></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal pl-4">
                    {menu}
                </ul>
            </div>
            {
                cartModalStatus && <CartModal cartItems={cartItems} setCartModalStatus={setCartModalStatus} refreshCart={refreshCart} setRefreshCart={setRefreshCart}></CartModal>
            }

        </div>
    );
};

export default Navbar;