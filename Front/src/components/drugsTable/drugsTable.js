import { React, useState, useEffect } from 'react'
import { Divider, FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';

import DrugListItem from '../../components/drugListItem/drugListItem';
import DrugsSearch from '../../components/drugsSearch/drugsSearch';

const DrugsTable = ({ patId }) => {
    const [myTempDrugsRaw, setMyTempDrugsRaw] = useState("")
    const [myTempDrugs, setMyTempDrugs] = useState("")
    const [myDrugs, setMyDrugs] = useState("")
    const [myDrugsFlag, setMyDrugsFlag] = useState(true)


    useEffect(() => {
        try {
            fetch(`http://localhost:8000/myDrugs/${patId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((drugs) => {
                    setMyTempDrugsRaw(drugs)
                });
        } catch (err) {
            console.log(err);
        }
    }, [patId])

   
   
    useEffect(() => {
        if (myTempDrugsRaw) {
            if (myTempDrugsRaw.length > 0) {
                let tempDra = myTempDrugsRaw.map((drug) => {
                    return (
                        <DrugListItem title={drug.drugName} dose={drug.dose} drugId={drug._id} date={drug.date} doseFactor={drug.doseFactor} doctorName={drug.doctorName} />
                    )
                })
                setMyTempDrugs(tempDra)
            } else {
                setMyTempDrugs(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No Tables</h5>)
            }
        }
    }, [myTempDrugsRaw])

    return (
        <div className='userDashboardCard showHeight' >
        <FlexboxGrid justify='space-between' className="my_doc_title">
            <FlexboxGridItem colspan={7} >
                <h2 className='green_sub'>Drugs</h2>
            </FlexboxGridItem>
            <FlexboxGridItem colspan={13} >
                <DrugsSearch patId={patId} listCallback={setMyDrugs} flagCallback={setMyDrugsFlag} />
            </FlexboxGridItem>
        </FlexboxGrid>
        <Divider className='divider' ></Divider>
        <div className='myDoctorsContent scrollable'>
            {(myDrugsFlag) ? (
                myTempDrugs
            ) : (
                myDrugs
            )}
        </div>
    </div>
    )
}

export default DrugsTable
