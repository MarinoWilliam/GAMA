import { React, useState, useEffect } from 'react'

import "./areaChart.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';



const AreaChart = (props) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    const [week, setWeek] = useState("")
    const [weekReports, setWeekReports] = useState("")
  


    useEffect(() => {
        try {
            Promise.all([
                fetch(`http://localhost:8000/getPastWeek`, { credentials: 'include' }),
                fetch(`http://localhost:8000/getPastWeekReports`, { credentials: 'include' }),
            ])
                .then(([resWeek, resWeekReports]) =>
                    Promise.all([resWeek.json(), resWeekReports.json()])
                )
                .then(([dataWeek, dataWeekAnalysis]) => {
                    setWeek(dataWeek)
                    setWeekReports(dataWeekAnalysis)
                }, [])

        } catch (err) {
            console.log(err);
        }
    }, [])

    // useEffect(() => {
    //     if (weekReports) {
    //         for (let weekReport of weekReports) {

    //         }
    //     }
    // }, [weekReports])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'GAMA Chart',
            },
        },
    };

    var labels;
    if (labels !== week) {
        labels = week
    }

    var reprtsData;
    if (reprtsData !== weekReports) {
        reprtsData = weekReports
    }


    
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Reports',
                data: reprtsData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };



    return (
        <div className='pieChartDiv'>
            <Line options={options} data={data} />
        </div>

    )
}

export default AreaChart