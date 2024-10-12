import React from 'react'
import { FlexboxGrid, Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import NavLink from "../NavLink/Navlink";

import "./operationListItem.css"



const OperationListItem = (props) => {

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
                            <p className='doc_spec'>{props.procedure}</p>
                        </FlexboxGridItem>

                    </FlexboxGrid>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={8}>
                    <p className='date'>Dr. {props.doctorName}</p>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={5}>
                    <Button appearance="link" className='' as={NavLink} href={`/`}>
                        <p className='moreDetails'>{String(props.date).substr(0, 15)}</p>
                    </Button>
                </FlexboxGridItem>
            </FlexboxGrid>
            <hr className='listHr' />
        </div>

    )
}

export default OperationListItem