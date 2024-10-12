import { React, useState, useEffect } from 'react'
import { Divider, FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';

import AnalysisListItem from '../analysisListItem/analysisListItem';
import AnalysisSearch from '../analysisSearch/analysisSearch';
import ScansSearch from '../scansSearch/scansSearch';

const AnalysisTable = ({ patId, type, flag }) => {
    const [myTempAnalysisRaw, setMyTempAnalysisRaw] = useState("")
    const [myTempAnalysis, setMyTempAnalysis] = useState("")
    const [myAnalysis, setMyAnalysis] = useState("")
    const [myAnalysisFlag, setMyAnalysisFlag] = useState(true)


    useEffect(() => {

        try {
            if (type === 'analysis') {
                fetch(`http://localhost:8000/myAnalysis/${patId}`, { credentials: 'include' })
                    .then((response) => response.json())
                    .then((analysis) => {
                        setMyTempAnalysisRaw(analysis)
                        setMyAnalysisFlag(true)
                    });
            } else {
                fetch(`http://localhost:8000/myScans/${patId}`, { credentials: 'include' })
                    .then((response) => response.json())
                    .then((analysis) => {
                        setMyTempAnalysisRaw(analysis)
                        setMyAnalysisFlag(true)
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }, [patId,type])



    useEffect(() => {
        if (myTempAnalysisRaw) {
            if (myTempAnalysisRaw.length > 0) {
                let tempAna = myTempAnalysisRaw.map((analys) => {
                    return (
                        <AnalysisListItem title={analys.title} analysisId={analys._id} date={analys.date} photo={analys.images.url} doctorName={analys.doctorName} />
                    )
                })
                setMyTempAnalysis(tempAna)
            } else {
                setMyTempAnalysis(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No Invistigations</h5>)
            }
        }
    }, [myTempAnalysisRaw,type])

    return (
        <div className='userDashboardCard showHeight' >
            <FlexboxGrid justify='space-between' className="my_doc_title">
                <FlexboxGridItem colspan={7} >
                    {(type === 'analysis') ? (
                        <h2 className='green_sub'>Analysis</h2>
                    ) : (
                        <h2 className='green_sub'>Scans</h2>
                    )}
                </FlexboxGridItem>
                <FlexboxGridItem colspan={13} >
                {(type === 'analysis') ? (
                    <AnalysisSearch patId={patId} type={type} listCallback={setMyAnalysis} flagCallback={setMyAnalysisFlag} />
                    ) : (
                        <ScansSearch patId={patId} type={type} listCallback={setMyAnalysis} flagCallback={setMyAnalysisFlag} />
                        )}
                </FlexboxGridItem>
            </FlexboxGrid>
            <Divider className='divider' ></Divider>
            <div className='myDoctorsContent scrollable'>
                {(myAnalysisFlag) ? (
                    myTempAnalysis
                ) : (
                    myAnalysis
                )}
            </div>
        </div>
    )
}

export default AnalysisTable
