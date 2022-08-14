import React from 'react';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
        <div  className='mx-auto my-auto'>
            <Helmet><title>Dashboard - Red Onion</title></Helmet>
            <p className='text-xl font-bold'>User Dashboard</p>
        </div>


    );
};

export default Dashboard;