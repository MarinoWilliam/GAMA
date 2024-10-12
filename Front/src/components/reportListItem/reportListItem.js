import React from 'react'
import { FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import ModalPob from "../modalPop/modalPop" 

import "./reportListItem.css"



const ReportListItem = (props) => {

    return (
        <div className='reportListItem'>
            <FlexboxGrid justify='space-between' align='middle'>
                <FlexboxGridItem colspan={1}>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={8}>
                    <FlexboxGrid justify='space-between'>
                        {/* <FlexboxGridItem colspan={9}>
                            {(props?.photo) ? (
                                <img src={props.photo} alt='userImg' className='sReportImg' />
                            ) : (
                                <img src={require("../../images/userImg.png")} alt='userImg' className='sReportImg' />
                            )}
                        </FlexboxGridItem> */}
                        <FlexboxGridItem colspan={8}>
                            <h3 className='doc_name smarginTop'>{props.title}</h3>
                            <p className='doc_spec'>{props.medicalField}</p>
                        </FlexboxGridItem>

                    </FlexboxGrid>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={8}>
                    <p className='date'>Dr. {props.doctorName}</p>
                    <p className='date'>{String(props.date).substr(0, 15)}</p>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={5}>
               < ModalPob reportId={props.reportId}/>
                </FlexboxGridItem>
            </FlexboxGrid>
            <hr className='listHr' />
        </div>

    )
}

export default ReportListItem