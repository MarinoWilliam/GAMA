import { React, useState, useEffect } from 'react'
import { FlexboxGrid } from 'rsuite';
import { useParams } from 'react-router-dom';

import PieChart from '../../components/pieChart/pieChart';
import BarChart from '../../components/barChart/barChart';
import RadarChart from '../../components/radarChart/radarChart';
import AreaChart from '../../components/areaChart/areaChart';
import LineChart from '../../components/lineChart/lineChart';


import "./docStats.css"

const DoctorHome = () => {


    const [doctor, setDoctor] = useState("")
    const [myOp, setMyOp] = useState("")
    const [myUpcomingOp, setMyUpcomingOp] = useState(0)
    const [opDates, setOpDates] = useState("")
    const [myPatients, setMyPatients] = useState("")
    const [myCurrentPatients, setMyCurrentPatients] = useState("")
    const today = useState(new Date())
    const { userId } = useParams();


    useEffect(() => {
        try {
            Promise.all([
                fetch(`http://localhost:8000/doctor/${userId}`, { credentials: 'include' }),
                fetch(`http://localhost:8000/findOpForDoc/${userId}`, { credentials: 'include' }),
            ])
                .then(([resDoctor, resOperations]) =>
                    Promise.all([resDoctor.json(), resOperations.json()])
                )
                .then(([dataDoctor, dataOperations]) => {
                    console.log(`doctor ; ${dataDoctor}`)
                    setDoctor(dataDoctor);
                    setMyOp(dataOperations);
                }, [])
        } catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        if (doctor) {
            let patientsList = [...doctor.patientsList.map((P) => { return P.patient })]
            let currentPatient = [...doctor.patientsList.filter((p) => { return p.state === 'recoverd' })]
            currentPatient = currentPatient.map((P) => { return P.patient })
            setMyPatients(patientsList)
            setMyCurrentPatients(currentPatient)
        }
    }, [doctor])

    useEffect(() => {
        if (myOp) {
            let opDatesArr = [myOp.map((op) => {
                return (new Date(op.date))
            })]

            let upcomingOpArr = opDatesArr.filter((opDate) => { return opDate > today })
            setOpDates(opDatesArr)
            setMyUpcomingOp(upcomingOpArr)
        }
    }, [myOp])



    return (
        <div className='statContainer'>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={6}>
                    <div className='statsNum'>

                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={8}>
                                <p className='NumGraphPara'>No of Patients in each gender :</p>

                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={16}>
                                <PieChart />
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <div className='statsNum'>
                        <BarChart />
                        <p className='BarPara'>Chronic diseases stats</p>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <div className='statsNumRadar'>
                        <RadarChart />
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <div className='statsNum'>
                        <AreaChart />
                    </div>
                </FlexboxGrid.Item>

            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <div className='statMain'>
                        <LineChart />
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    <div className='statMain'>
                        <p className='statMainHeaderTitle'>Stats Report:</p>
                        <p className='statMainHeaderPara'>Have a look at your stats.</p>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={11}>
                                <div className='statsMini whiteStat'>
                                    <p className="miniStatTitle">Recoverd Patients</p>
                                    <p className="miniStatNumber">{myCurrentPatients.length}</p>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={11}>

                                <div className='statsMini orangeStat'>
                                    <p className="miniStatTitle">Total Patients</p>
                                    <p className="miniStatNumber">{myPatients.length}</p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={11}>
                                <div className='statsMini greenStat'>
                                    <p className="miniStatTitle">Upcoming Operations</p>
                                    <p className="miniStatNumber">{myUpcomingOp.length}</p>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={11}>
                                <div className='statsMini blueStat'>
                                    <p className="miniStatTitle">Total Operations</p>
                                    <p className="miniStatNumber">{myOp.length}</p>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>

        </div>


    )
}

export default DoctorHome