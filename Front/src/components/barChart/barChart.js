import { React, useState, useEffect } from 'react'

import "./barChart.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';



const BarChart = (props) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

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

    const [reportsArr, setReportsArr] = useState([])

    const [anemiaCount, setAnemiaCount] = useState(0)
    const [dmCount, setDmCount] = useState(0)
    const [htnCount, setHtnCount] = useState(0)
    const [renalCount, setRenalCount] = useState(0)
    const [liverCount, setLiverCount] = useState(0)

    const [chronicsArr, setChronicsArr] = useState([])

    var chronics = []
    var anemiaCounter = 0;
    var dmCounter = 0;
    var htnCounter = 0;
    var renalCounter = 0;
    var liverCounter = 0;



    useEffect(() => {
        try {
            fetch(`http://localhost:8000/myPats`, { credentials: 'include' })
                .then((response) => response.json())
                .then((patients) => {
                    console.log(`reports: ${patients.map((p) => p.reports)}`)
                    setReportsArr(patients.map((p) => {
                        return p.reports;
                    }))
                });

        } catch (err) {
            console.log(err);
        }
    }, [])

    // useEffect(() => {
    //     if (reportsArr.length > 0) {
    //         for (let report of reportsArr) {
    //             chronics.push(report.map(report => {
    //                 return report.chronic.chronic
    //             }))
    //         }
    //         setChronicsArr(chronics)
    //     }
    // }, [reportsArr])

    useEffect(() => {
        if (reportsArr) {
            for (let reportArr of reportsArr) {
                for (let report of reportArr) {
                            chronics.push(report.chronic)
                            setChronicsArr(chronics)
                }
            }
        }
    }, [reportsArr])



    useEffect(() => {
        if (chronicsArr) {
            for (let chronic of chronicsArr) {
                if (chronic === 'Anemia') {
                    anemiaCounter += 1;
                } else if ((chronic === 'Diabetes Melitus DM')) {
                    dmCounter += 1;
                } else if ((chronic === 'Hypertension HTN')) {
                    htnCounter += 1
                } else if ((chronic === 'Renal')) {
                    renalCounter += 1
                } else if ((chronic === 'Liver')) {
                    liverCounter += 1
                }

                setAnemiaCount(anemiaCounter);
                setDmCount(dmCounter);
                setHtnCount(htnCounter);
                setRenalCount(renalCounter);
                setLiverCount(liverCounter);

                console.log(chronic)
            }
        }
    }, [chronicsArr])


    const labels = ["Anemia", "DM", "HTN", "Renal", "Liver"];

    const data = {
        labels,
        datasets: [
            {
                label: 'No of Patients',
                data: [anemiaCount, dmCount, htnCount, renalCount, liverCount],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };


    return (
        <div className='pieChartDiv'>
            <Bar options={options} data={data} />
        </div>

    )
}

export default BarChart