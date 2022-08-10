import React from 'react';
import { AiOutlineSmallDash } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { FaRegBell } from 'react-icons/fa';
import image1 from '../../resources/whyChoiceUs1.png';
import image2 from '../../resources/whyChoiceUs2.png';
import image3 from '../../resources/whyChoiceUs3.png';
import '../../Styles/WhyChooseUs.css';


const WhyChooseUs = () => {
    return (
        <div className='lg:px-12 text-accent'>
            <div className='flex justify-center items-center text-xl font-semibold'>
                <div className='text-5xl text-primary'><AiOutlineSmallDash /></div>
                <div className='mx-2'>Why you choose us</div>
                <div className='text-5xl text-primary'><AiOutlineSmallDash /></div>
            </div>
            <div className='flex justify-center text-gray-500 pb-12'>
                <p className='text-justify max-w-lg xs:max-w-xs'>Barton waited twenty always repair in within we do. An delighted offering curiosity my is dashwoods at.Boy prosperous increasing surrounded.</p>
            </div>

            {/* why you choose up card */}

            <div className='grid lg:grid-cols-3 sm:grid-cols-1 justify-items-center items-center gap-5 pb-12'>
                <div class="card w-96 xs:max-w-xs bg-base-100 whyChoiceUsCard ">
                    <figure><img className='rounded-lg xs:h-xs h-96' src={image3} alt="Shoes" /></figure>
                    <div class="card-body">

                        <div className='flex justify-items-start'>
                            <MdOutlineDeliveryDining className='text-[100px] mt-[-35px] text-primary  mr-2' />
                            <div>
                                <div>
                                    <p className='font-semibold'>Fast Delivery</p>
                                </div>
                                <div>
                                    <p className='text-[16px] text-gray-500 text-justify'>Keep your system in sync with automated web hook based notifications each time link is paid and how we dream about our future.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card w-96 xs:max-w-xs bg-base-100  whyChoiceUsCard">
                    <figure><img className='rounded-lg h-96 xs:max-h-xs w-full' src={image2} alt="Shoes" /></figure>
                    <div class="card-body">

                        <div className='flex justify-items-start'>
                            <FaRegBell className='text-[100px] mt-[-35px] text-primary  mr-2' />
                            <div>
                                <div>
                                    <p className='font-semibold'>A Good Auto Responder</p>
                                </div>
                                <div>
                                    <p className='text-[16px] text-gray-500 text-justify'>Keep your system in sync with automated web hook based notifications each time link is paid and how we dream about our future.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card w-96 xs:max-w-xs bg-base-100  whyChoiceUsCard ">
                    <figure><img className='rounded-lg h-96 xs:max-h-xs' src={image1} alt="Shoes" /></figure>
                    <div class="card-body">

                        <div className='flex justify-items-start'>
                            <TbTruckDelivery className='text-[100px] mt-[-35px] text-primary  mr-2' />
                            <div>
                                <div>
                                    <p className='font-semibold'>Home Delivery</p>
                                </div>
                                <div>
                                    <p className='text-[16px] text-gray-500 text-justify'>Keep your system in sync with automated web hook based notifications each time link is paid and how we dream about our future.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WhyChooseUs;