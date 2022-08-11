import React from 'react';
import '../../Styles/Home.css'



const Home = ({setSearchText}) => {
    return (
        <div>
            <div class="hero xs:pt-10 xs:h-80 lg:min-h-screen homeBanner ">
                <div class="hero-content text-center">
                    <div class="max-w-md mt-[-100px]">
                        <h1 data-aos="fade-down" data-aos-delay="500" class="lg:text-3xl xs:text-lg font-semibold whitespace-nowrap mb-10 xs:mb-3">Best Food Waiting For Your Belly</h1>

                        <input data-aos="fade-up" data-aos-delay="500" onChange={(e)=>setSearchText(e.target.value)} className='rounded-lg h-10 lg:w-96 xs:w-64 pl-3 input-primary ' type="text" placeholder="Search Food Items" class="input w-full max-w-xs" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;