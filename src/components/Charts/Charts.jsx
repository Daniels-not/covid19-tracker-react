import React from 'react'
import { useState, useEffect } from "react";
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import Classes from './Charts.module.css';

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchApi();
    });

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: 'hsl(252, 77%, 20%)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'hsl(340, 55%, 34%)',
                        fill: true,
                    }]
                }}
            />
        ) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['hsl(252, 77%, 20%)', 'hsl(184, 74%, 44%)', 'hsl(340, 55%, 34%)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
                }}
            />
        ) : null
    );

    return (
        <div className={Classes.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;