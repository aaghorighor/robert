import React from 'react';
import { Text } from 'suftnet-ui-kit';
import { useQuery } from '@apollo/client';
import moment from 'moment'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FETCH_DONATION_TYPE_DAILY_AGGREGATES } from '../../../../queries/donation';

const defaultWeekData = [
    { day: 'Sun', Offerings: 0, Tithes: 0 },
    { day: 'Mon', Offerings: 0, Tithes: 0 },
    { day: 'Tue', Offerings: 0, Tithes: 0 },
    { day: 'Wed', Offerings: 0, Tithes: 0 },
    { day: 'Thu', Offerings: 0, Tithes: 0 },
    { day: 'Fri', Offerings: 0, Tithes: 0 },
    { day: 'Sat', Offerings: 0, Tithes: 0 }
];

const mergeData = (apiData) => {
    const dataByDay = apiData?.reduce((acc, curr) => {
        const dayName = moment(curr.date).format('ddd');
        const index = acc.findIndex(day => day.day === dayName);
        if (index > -1) {
            acc[index].Offerings += curr.donations.find(d => d.type === 'Offerings')?.totalAmount || 0;
            acc[index].Tithes += curr.donations.find(d => d.type === 'Tithes')?.totalAmount || 0;
        }
        return acc;
    }, [...defaultWeekData]);

    return dataByDay;
};

const DonationAreaChart = () => {  
    const { data } = useQuery(FETCH_DONATION_TYPE_DAILY_AGGREGATES);    
    const chartData = mergeData(data?.getDonationByDaily);

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Offerings" fill="#e6b800" />
                    <Bar dataKey="Tithes" fill="#0099cc" />
                </BarChart>
            </ResponsiveContainer>
            <div className="flex-row align-items-center justify-content-center">
                <div className='cycle__2s'>
                    <Text as="p" className="fs-15 fw-normal px-1">
                        Daily Donations
                    </Text>
                </div>
            </div>
        </>
    );
};


export default DonationAreaChart;
