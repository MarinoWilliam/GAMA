import { React, useState, useEffect } from 'react'
import { Divider, FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';

import OperationListItem from '../operationListItem/operationListItem';
import OperationsSearch from '../operationsSearch/operationsSearch';

const OperationsTable = ({ patId }) => {
    const [myTempOperationsRaw, setMyTempOperationsRaw] = useState("")
    const [myTempOperations, setMyTempOperations] = useState("")
    const [myOperations, setMyOperations] = useState("")
    const [myOperationsFlag, setMyOperationsFlag] = useState(true)


    useEffect(() => {
        try {
            fetch(`http://localhost:8000/myOperations/${patId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((operations) => {
                    setMyTempOperationsRaw(operations)
                });
        } catch (err) {
            console.log(err);
        }
    }, [patId])

   
   
    useEffect(() => {
        if (myTempOperationsRaw) {
            if (myTempOperationsRaw.length > 0) {
                let tempOper = myTempOperationsRaw.map((operation) => {
                    return (
                        <OperationListItem title={operation.type} procedure={operation.procedure} operationId={operation._id} date={operation.date} doctorName={operation.doctorName} />
                    )
                })
                setMyTempOperations(tempOper)
            } else {
                setMyTempOperations(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No Operations</h5>)
            }
        }
    }, [myTempOperationsRaw])

    return (
        <div className='userDashboardCard showHeight' >
        <FlexboxGrid justify='space-between' className="my_doc_title">
            <FlexboxGridItem colspan={7} >
                <h2 className='green_sub'>Operations</h2>
            </FlexboxGridItem>
            <FlexboxGridItem colspan={13} >
                <OperationsSearch patId={patId} listCallback={setMyOperations} flagCallback={setMyOperationsFlag} />
            </FlexboxGridItem>
        </FlexboxGrid>
        <Divider className='divider' ></Divider>
        <div className='myDoctorsContent scrollable'>
            {(myOperationsFlag) ? (
                myTempOperations
            ) : (
                myOperations
            )}
        </div>
    </div>
    )
}

export default OperationsTable
