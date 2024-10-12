import { React, useState, useEffect } from 'react'
import { Divider, FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';

import ReportListItem from '../../components/reportListItem/reportListItem';
import ReportsSearch from '../../components/reportsSearch/reportsSearch';

const ReportsTable = ({ patId }) => {
    const [myTempReportsRaw, setMyTempReportsRaw] = useState("")
    const [myTempReports, setMyTempReports] = useState("")
    const [myReports, setMyReports] = useState("")
    const [myReportsFlag, setMyReportsFlag] = useState(true)


    useEffect(() => {
        try {
            fetch(`http://localhost:8000/myReports/${patId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((reports) => {
                    setMyTempReportsRaw(reports)
                });
        } catch (err) {
            console.log(err);
        }
    }, [patId])

   
   
    useEffect(() => {
        if (myTempReportsRaw) {
            if (myTempReportsRaw.length > 0) {
                let tempRepo = myTempReportsRaw.map((report) => {
                    return (
                        <ReportListItem title={report.title} medicalField={report.medicalField} reportId={report._id} date={report.date} photo={report.images.url} doctorName={report.doctorName} />
                    )
                })
                setMyTempReports(tempRepo)
            } else {
                setMyTempReports(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No Reports</h5>)
            }
        }
    }, [myTempReportsRaw])

    return (
        <div className='userDashboardCard showHeight' >
        <FlexboxGrid justify='space-between' className="my_doc_title">
            <FlexboxGridItem colspan={7} >
                <h2 className='green_sub'>Reports</h2>
            </FlexboxGridItem>
            <FlexboxGridItem colspan={13} >
                <ReportsSearch patId={patId} listCallback={setMyReports} flagCallback={setMyReportsFlag} />
            </FlexboxGridItem>
        </FlexboxGrid>
        <Divider className='divider' ></Divider>
        <div className='myDoctorsContent scrollable'>
            {(myReportsFlag) ? (
                myTempReports
            ) : (
                myReports
            )}
        </div>
    </div>
    )
}

export default ReportsTable
