import React from 'react';
import '../../../../Styles/Chart.css';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const BarChartForOrder = ({ orderCount }) => {

    const { allOrderCount, allProcessingCount, allShippedCount, allCancelCount } = orderCount;

    const data = [
        { name: 'Total Order', value:  allOrderCount},
        { name: 'Processing', value: allProcessingCount },
        { name: 'Shipped', value:allShippedCount },
        { name: 'Cancel', value: allCancelCount }
    ];


    return (
        <div style={{paddingBottom:40, width:450, height: 300}} className='border-2 rounded-2xl p-5 chart-container '>
            <p className='chart-heading text-center mb-5 font-bold text-gray-500'>Order History</p>
            <ResponsiveContainer>
            <BarChart className='mr-5'  width={450} height={250} data={data}>
                <XAxis dataKey="name" stroke="#758283" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                <Bar dataKey="value" fill="#1FAA59" barSize={30} />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartForOrder;