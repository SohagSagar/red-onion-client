import React from 'react';
import { PieChart, Legend, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../../../../Styles/Chart.css';

const PieChartForOrder = ({ orderCount }) => {
    const { allOrderCount, allProcessingCount, allShippedCount, allCancelCount } = orderCount;

    const data2 = [
        { name: 'Total Order', value: allOrderCount },
        { name: 'Processing', value: allProcessingCount },
        { name: 'Shipped', value: allShippedCount },
        { name: 'Cancel', value: allCancelCount },
    ];

    const COLORS = ['#1FAA59', '#50DBB4', '#E8BD0D', '#DE4839'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    
    return (
        <div style={{paddingBottom:50 ,width:450, height: 300}}  className='border-2 rounded-2xl p-5 chart-container'>
            <p className='chart-heading text-center mb-5 font-bold text-gray-500'>Order Ratio in percentage</p>
            <ResponsiveContainer>
                <PieChart width={450} height={250}>
                    <Tooltip />
                    <Legend />

                    <Pie
                        data={data2}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartForOrder;