import React from 'react';
import '../../Styles/Home.css'



const Home = () => {
    return (
        <div>
            <div class="hero min-h-screen homeBanner">
                <div class="hero-content text-center">
                    <div class="max-w-md mt-[-100px]">
                        <h1 class="text-3xl font-semibold whitespace-nowrap mb-10">Best Food Waiting For Your Belly</h1>

                        <input className='rounded-lg h-10 w-96 pl-3 input-primary ' type="text" placeholder="Search Food Items" class="input w-full max-w-xs" />

                       


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;