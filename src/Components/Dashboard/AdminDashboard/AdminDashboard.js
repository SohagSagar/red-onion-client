import React from 'react';
import BarChartForOrder from './Charts/BarChartForOrder';
import PieChartForOrder from './Charts/PieChartForOrder';


const AdminDashboard = () => {
    return (
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-5'>
            <BarChartForOrder/>
            <PieChartForOrder/>
            
        </div>
    );
};

export default AdminDashboard;