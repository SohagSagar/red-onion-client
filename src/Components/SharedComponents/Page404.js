import React from 'react';
import { Link } from 'react-router-dom';
import page404 from '../../resources/pageNotFound.gif'

const Page404 = () => {
    return (
        <div >
            <div className='flex flex-col justify-center items-center py-12'>
                <p className='font-bold text-2xl text-center'>Page Not Found</p>
                 <button  class="btn btn-sm btn-wide rounded-full btn-primary mt-1"><Link to={'/'}>Go to Home</Link></button>
                <img className='w-[500px]' src={page404} alt="" />
            </div>
        </div>
    );
};

export default Page404;