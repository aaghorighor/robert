import React from 'react';
import { Text } from 'suftnet-ui-kit';
import { useQuery } from '@apollo/client';
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';
import { FETCH_DONATION_TYPE_AGGREGATES } from '../../../../queries/donation';

const DonationPieChart = () => {   
    const {data} = useQuery(FETCH_DONATION_TYPE_AGGREGATES);   
    const pieChartData = data?.getByDonationTypeAggregates?.map(entry => ({
                name: entry._id.donation_type,
                value: entry.totalAmount
            }));

    const COLORS = ['#e6b800', '#0099cc'];

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
        <>
            <ResponsiveContainer width="100%" height={300} style={{ boxShadow: 'unset'}}>
                <PieChart>
                    <Pie dataKey="value" data={pieChartData} labelLine={false} label={renderCustomizedLabel} outerRadius={130} fill="#6200EE">
                        {pieChartData?.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <div className="flex-row align-items-center justify-content-center">
                <div className='cycle__2s'>
                    <Text as="p" className="fs-15 fw-normal px-1">
                        Monthly Donations till date
                    </Text>
                </div>
            </div>
        </>

    );
};


export default DonationPieChart;
