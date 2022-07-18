import React from 'react';
import '../../Styles/Navbar.css';
import logo from '../../resources/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase';
import Loading from './Loading';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';



const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    //sign out user
    const signout = () => {
        signOut(auth);
        toast.success('Signout successfully');
        navigate('/login');

    }
    if (loading) {
        return <Loading />
    }
    const menu = <>
        {
            user && <li className='px-10 text-accent italic'> Welcome {user?.displayName} </li>
        }

        <li className=' text-accent'> Cart <sup className='p-1'>0</sup></li>
        {
            !user ? <Link className='px-5 ' to="/login">Login</Link> :
                <Link className='px-5 ' to="/dashboard">Dashboard</Link>
        }

        {
            user ? <li><button onClick={() => signout()} class="btn btn-sm text-secondary rounded-full bg-primary border-0 normal-case px-7 pt-2">Sign out</button></li> :
                <li><button class="btn btn-sm text-secondary rounded-full bg-primary border-0 normal-case px-7 pt-2"><Link to="/signup">Signup</Link></button></li>
        }


    </>
    return (
        <div class="lg:px-12 navbar bg-secondary  shadow-2xl font-semibold ">
            <div class="navbar-start flex items-center">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ">
                        {menu}
                    </ul>
                </div>

                <Link to={'/'} class="btn btn-ghost normal-case text-xl"><img className='w-36' src={logo} alt="" srcset="" /></Link>
            </div>
            <div class="navbar-end hidden lg:flex">
                <ul class="menu menu-horizontal pl-4">
                    {menu}
                </ul>
            </div>
            {/* <BsCartCheck/> */}

        </div>
    );
};

export default Navbar;