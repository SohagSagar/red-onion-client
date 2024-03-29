import React from 'react';
import { AiOutlineSmallDash } from 'react-icons/ai';
import TestimonialCard from './TestimonialCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../SharedComponents/Loading';
import { useState } from 'react';
import { useEffect } from 'react';

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear",
        // fade: true,
        autoplay: true,
        slidesToShow: 1,
        pauseOnHover: false,
        slidesToScroll: 1
        
    };

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('https://red-onion-server.up.railway.app/user-reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <div className='lg:px-12 text-accent pb-10 '>
            <div className='flex justify-center items-center text-xl font-semibold'>
                <div className='text-5xl text-primary'><AiOutlineSmallDash /></div>
                <div className='mx-2'>Testimonials</div>
                <div className='text-5xl text-primary'><AiOutlineSmallDash /></div>
            </div>

            <Slider {...settings}>
                {
                    !reviews && <Loading />
                }
                {
                    reviews?.map(review =>
                        <div key={review._id}>
                            <TestimonialCard
                                review={review}
                            />
                        </div>
                    )
                }
            </Slider>
        </div>
    );
};

export default Testimonials;