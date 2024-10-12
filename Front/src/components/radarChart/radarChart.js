import { React, useState, useEffect } from 'react'

import "./radarChart.css"

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';



const RadarChart = (props) => {

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );





    const [agesArr, setAgesArr] = useState([])

    const [ageOneCount, setAgeOneCount] = useState(0)
    const [ageTwoCount, setAgeTwoCount] = useState(0)
    const [ageThreeCount, setAgeThreeCount] = useState(0)
    const [ageFourCount, setAgeFourCount] = useState(0)
    const [ageFiveCount, setAgeFiveCount] = useState(0)

    var ageOneCounter = 0;
    var ageTwoCounter = 0;
    var ageThreeCounter = 0;
    var ageFourCounter = 0;
    var ageFiveCounter = 0;



    useEffect(() => {
        try {
            fetch(`http://localhost:8000/myPats`, { credentials: 'include' })
                .then((response) => response.json())
                .then((patients) => {
                    setAgesArr(patients.map((p) => p.age))
                });

        } catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        if (agesArr) {
            for (let age of agesArr) {
                if (age < 22) {
                    ageOneCounter += 1;
                } else if (age < 46) {
                    ageTwoCounter += 1;
                } else if (age < 61) {
                    ageThreeCounter += 1
                } else if (age < 81) {
                    ageFourCounter += 1
                } else {
                    ageFiveCounter += 1
                }

                setAgeOneCount(ageOneCounter);
                setAgeTwoCount(ageTwoCounter);
                setAgeThreeCount(ageThreeCounter);
                setAgeFourCount(ageFourCounter);
                setAgeFiveCount(ageFiveCounter);

            }
        }
    }, [agesArr])


    const data = {
        labels: ['0-21', '22-45', '46-60', '61-80', '80 +'],
        datasets: [
            {
                label: 'No of Patients per Age',
                data: [ageOneCount, ageTwoCount, ageThreeCount, ageFourCount, ageFiveCount],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='pieChartDiv'>
            <Radar className='radar' data={data} />
        </div>

    )
}

export default RadarChart