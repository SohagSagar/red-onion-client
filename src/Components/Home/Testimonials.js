import React from 'react';
import { AiOutlineSmallDash } from 'react-icons/ai';
import TestimonialCard from './TestimonialCard';
import "../../Styles/SwiperStyle.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
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
        // responsive: [
        //     {
        //         breakpoint: 1200,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 1000,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             initialSlide: 2
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ]
    };

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/user-reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <div className='lg:px-12 text-accent pb-10'>
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
                        <div>
                            <TestimonialCard
                                key={review._id}
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