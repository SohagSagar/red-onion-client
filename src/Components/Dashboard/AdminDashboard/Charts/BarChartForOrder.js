import React from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'Total Order', value: 40 },
    { name: 'Processing', value: 30 },
    { name: 'Shipped', value: 15 },
    { name: 'Cancel', value: 5 }
];

const BarChartForOrder = () => {
    return (
        <div className='border-2 rounded-2xl p-5'>
            <p className='chart-heading text-center mb-5 font-bold text-gray-500'>Order History</p>
            <BarChart width={450} height={250} data={data}>
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