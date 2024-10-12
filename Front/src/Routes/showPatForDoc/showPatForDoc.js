import { React, useState, useEffect } from 'react'
import { FlexboxGrid, Col } from 'rsuite';
import { useParams } from 'react-router-dom';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import "./showPatForDoc.css"

import ShowSideNavBar from '../../components/showSideNavBar/showSideNavBar';
import ReportsTable from '../../components/reportsTable/reportsTable';
import DrugsTable from '../../components/drugsTable/drugsTable';
import AnalysisTable from '../../components/analysisTable/analysisTable';
import OperationsTable from '../../components/operationsTable/operationsTable';


const ShowPatForDoc = () => {
    // patient data state
    const [patient, setpatient] = useState("")

    const [table, setTable] = useState("Reports")

    const { patId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/ShowPatForDoc/${patId}`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                setpatient(data);
            });
    }, [table]);




    return (
        <div className='container'>

            <FlexboxGrid justify="center" >
                {/* Patient Info Card */}
                <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                    <div className='margin_left_left'>
                        <FlexboxGrid justify="space-between">
                            <FlexboxGridItem colspan={5}>
                                {(patient?.profilePicture?.url) ? (
                                    <img src={patient.profilePicture.url} alt='userImg' className='userImg' />
                                ) : (
                                    <img src={require("../../images/userImg.png")} alt='userImg' className='userImg' />
                                )}
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={16} className='right_userinfo_card'>
                                <FlexboxGrid align='bottom'>
                                    <FlexboxGridItem colspan={20}>
                                        <h2 className='fullName'>{patient.fullName}</h2>
                                    </FlexboxGridItem>
                                    <FlexboxGridItem colspan={4}>
                                    </FlexboxGridItem>
                                </FlexboxGrid>
                                <FlexboxGrid align='bottom' className=''>
                                    <FlexboxGridItem colspan={12}>
                                        <p className='infoShow'>{patient.location}</p>
                                        <p className='infoShow'> Age : {patient.age}</p>
                                        <p className='infoShow'> Gender : {patient.gender}</p>
                                    </FlexboxGridItem>
                                    <FlexboxGridItem colspan={8}>
                                    </FlexboxGridItem>
                                </FlexboxGrid>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>



            <FlexboxGrid justify="start" align='middle' className='lMarginTop lMarginBottom'>
                <FlexboxGrid.Item as={Col} colspan={5}>
                    <ShowSideNavBar tableCallback={setTable} />
                </FlexboxGrid.Item>

                <FlexboxGrid.Item as={Col} colspan={13}>
                    {(table === 'Reports') ? (
                        <ReportsTable patient={patient} patId={patId} />
                    ) : (table === 'Drugs') ? (
                        <DrugsTable patient={patient} patId={patId} />
                    ) : (table === 'Analysis') ? (
                        <AnalysisTable type={'analysis'} patient={patient} patId={patId} />
                    ) : (table === 'Scans')? (
                        <AnalysisTable type={'scans'} patient={patient} patId={patId} />
                    ) : (
                        <OperationsTable type={'scans'} patient={patient} patId={patId}/>
                    )}
                </FlexboxGrid.Item>
            </FlexboxGrid>



        </div>
    )
}

export default ShowPatForDoc