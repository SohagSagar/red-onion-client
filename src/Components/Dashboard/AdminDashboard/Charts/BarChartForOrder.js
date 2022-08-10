import React from 'react';
import chart from '../../../../Styles/Chart.css';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';



const BarChartForOrder = ({ orderCount }) => {

    const { allOrderCount, allProcessingCount, allShippedCount, allCancelCount } = orderCount;

    const data = [
        { name: 'Total Order', value:  allOrderCount},
        { name: 'Processing', value: allProcessingCount },
        { name: 'Shipped', value:allShippedCount },
        { name: 'Cancel', value: allCancelCount }
    ];
    var viewportwidth = window.innerWidth;
    console.log(viewportwidth);

    return (
        <div className='border-2 rounded-2xl p-5 chart '>
            <p className='chart-heading text-center mb-5 font-bold text-gray-500'>Order History</p>
            <BarChart  width={450} height={250} data={data}>
                <XAxis dataKey="name" stroke="#758283" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                <Bar dataKey="value" fill="#1FAA59" barSize={50} />
            </BarChart>
        </div>
    );
};

export default BarChartForOrder;