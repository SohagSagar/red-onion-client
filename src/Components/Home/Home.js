import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../../Styles/Home.css'



const Home = ({setSearchText}) => {
    return (
        <div>
            <Helmet><title> Red Onion</title></Helmet>
            <div className="hero xs:pt-10 xs:h-80 lg:min-h-screen homeBanner ">
                <div className="hero-content text-center">
                    <div className="max-w-md mt-[-100px]">
                        <h1 data-aos="fade-down" data-aos-delay="500" className="lg:text-3xl xs:text-lg font-semibold whitespace-nowrap lg:mb-15 xs:mb-3">Best Food Waiting For Your Belly</h1>
                        <p className='py-3 lg:block xs:hidden'></p>
                        <input data-aos="fade-up" data-aos-delay="500" onChange={(e)=>setSearchText(e.target.value)}  type="text" placeholder="Search Food Items" className="input w-full max-w-xs rounded-lg h-10 lg:w-96 xs:w-64 pl-3 " />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;