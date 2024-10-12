import React from 'react'
import { FlexboxGrid} from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import ModalPopAnalysis from "../modalPopAnalysis/modalPopAnalysis" 


import "./analysisListItem.css"

const AnalysisListItem = (props) => {

    return (
        <div className='reportListItem'>
            <FlexboxGrid justify='space-between' align='middle'>
                <FlexboxGridItem colspan={1}>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={10}>
                    <FlexboxGrid justify='space-between'>
                        <FlexboxGridItem colspan={24}>
                            <h3 className='doc_name ana_name smarginTop'>{props.title}</h3>
                        </FlexboxGridItem>

                    </FlexboxGrid>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={6}>
                    <p className='date'>Dr. {props.doctorName}</p>
                    <p className='date'>{String(props.date).substr(0, 15)}</p>
                </FlexboxGridItem>
                
                <FlexboxGridItem colspan={5}>
                < ModalPopAnalysis analysisId={props.analysisId}/>
                </FlexboxGridItem>
            </FlexboxGrid>
            <hr className='listHr' />
        </div>

    )
}

export default AnalysisListItem