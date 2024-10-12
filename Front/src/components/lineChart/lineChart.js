import { React, useState, useEffect } from 'react'

import "./lineChart.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';




const LineChart = (props) => {

    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const [week, setWeek] = useState("")
    const [weekScan, setWeekScan] = useState("")
    const [weekAnalysis, setWeekAnalysis] = useState("")



    useEffect(() => {
        try {
            Promise.all([
                fetch(`http://localhost:8000/getPastWeek`, { credentials: 'include' }),
                fetch(`http://localhost:8000/getPastWeekAnalysis`, { credentials: 'include' }),
                fetch(`http://localhost:8000/getPastWeekScans`, { credentials: 'include' }),
            ])
                .then(([resWeek, resWeekReports,resWeekScans]) =>
                    Promise.all([resWeek.json(), resWeekReports.json(), resWeekScans.json()])
                )
                .then(([dataWeek, dataWeekAnalysis,dataWeekScans]) => {
                    setWeek(dataWeek)
                    setWeekAnalysis(dataWeekAnalysis)
                    setWeekScan(dataWeekScans)
                }, [])

        } catch (err) {
            console.log(err);
        }
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'GAMA Charts',
            },
        },
    };


    var labels;
    if (labels !== week) {
        labels = week
    }

    var analysisData;
    if (analysisData !== weekAnalysis) {
        analysisData = weekAnalysis
    }

    var scanData;
    if (scanData !== weekScan) {
        scanData = weekScan
    }



    var data = {
        labels,
        datasets: [
            {
                label: 'Analysis',
                data: analysisData,
                borderColor: 'rgb(255, 145, 0, 0.7)',
                backgroundColor: 'rgba(255, 145, 0, 0.3)',
            },
            {
                label: 'Scans',
                data: scanData,
                borderColor: 'rgb(14, 176, 147, 0.7)',
                backgroundColor: 'rgba(14, 176, 147, 0.3)',
            },
        ],
    };


    return (
        <div className='pieChartDiv'>
            <Line className='graph' options={options} data={data} />
        </div>

    )
}

export default LineChart