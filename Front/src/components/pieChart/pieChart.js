import { React, useState, useEffect } from 'react'

import "./pieChart.css"

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

import { Pie } from 'react-chartjs-2';



const PieChart = (props) => {

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

    const [gendersArr, setGendersArr] = useState([])
    const [maleCount, setMaleCount] = useState(0)
    const [femaleCount, setFemaleCount] = useState(0)
    var malecounter=0
    var femalecounter=0


    useEffect(() => {
        try {
            fetch(`http://localhost:8000/myPats`, { credentials: 'include' })
                .then((response) => response.json())
                .then((patients) => {
                    setGendersArr(patients.map((p) => p.gender))
                });

        } catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        if (gendersArr) {
            for (let pat of gendersArr ){
                if (pat==='male'){
                    malecounter=malecounter+1;
                }else{
                    femalecounter=femalecounter+1;
                }
                setFemaleCount(femalecounter)
                setMaleCount(malecounter)

            }
        }
    }, [gendersArr])


    var pieData = {
        labels: ['Females', 'Males   '],
        datasets: [
            {
                label: 'No. of Patients',
                data: [femaleCount, maleCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };




    return (
        <div className='pieChartDiv'>
            <Pie data={pieData} />
        </div>

    )
}

export default PieChart