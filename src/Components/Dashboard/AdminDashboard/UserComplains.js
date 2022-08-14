import React from 'react';
import { Helmet } from 'react-helmet-async';

const UserComplains = () => {
    return (
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className='mx-auto my-auto'>
            <Helmet><title>Complains - Red Onion</title></Helmet>
            <p className='text-xl font-bold'>Users Complain</p>
        </div>
    );
};

export default UserComplains;