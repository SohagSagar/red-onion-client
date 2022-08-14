import React from 'react';
import { Helmet } from 'react-helmet-async';
import useChartData from '../../Hooks/useChartData';
import Loading from '../../SharedComponents/Loading';
import BarChartForOrder from './Charts/BarChartForOrder';
import PieChartForOrder from './Charts/PieChartForOrder';


const AdminDashboard = () => {
    const orderCount=useChartData();
    if(!orderCount ){
        return <Loading/>
    }
    
    return (
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 justify-items-center items-center gap-5 mt-5'>
            <Helmet><title>Dashboard - Red Onion</title></Helmet>
            <BarChartForOrder orderCount={orderCount}/>
            <PieChartForOrder orderCount={orderCount}/>

        </div>
    );
};

export default AdminDashboard;