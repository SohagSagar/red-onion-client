import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className=' flex  justify-center mx-auto'>
            <ThreeDots color='#F91944' ariaLabel="loading-indicator" />
        </div>
    );
};

export default Loading;