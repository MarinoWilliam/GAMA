import React, { useState } from 'react';

import { FlexboxGrid, Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import EmailIcon from '@rsuite/icons/Email';
import NavLink from "../NavLink/Navlink";
import VisibleIcon from '@rsuite/icons/Visible';
import DetailIcon from '@rsuite/icons/Detail';
import ClickAwayListener from 'react-click-away-listener';
import ScatterIcon from '@rsuite/icons/Scatter';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import LineChartIcon from '@rsuite/icons/LineChart';

import "./DoctorPatientListItem.css"




const DoctorPatientListItem = (props) => {

  const [popup, setPopup] = useState(false)

  return (
    <div className='listItem'>
      <FlexboxGrid justify='space-between' align='middle'>
        <FlexboxGridItem colspan={12}>
          <FlexboxGrid justify='space-between'>
            <FlexboxGridItem colspan={8}>
              {(props?.photo) ? (
                <img src={props.photo} alt='userImg' className='notfImg' />
              ) : (
                <img src={require("../../images/userImg.png")} alt='userImg' className='notfImg' />
              )}
              {/* <img src={require("../../images/userImg.png")} alt='userImg' height="50px" /> */}
            </FlexboxGridItem>
            <FlexboxGridItem colspan={14}>
            <Button appearance="link" className='name_value' as={NavLink} href={`/ShowPatForDoc/${props.patientId}`}>
            <h3 className='doc_name'>{props.patientName} <EmailIcon /></h3>
              </Button>
              <p className='pat_age'>Age :{props.age}</p>
              <p className='pat_age'>Gender :{props.gender}</p>
            </FlexboxGridItem>
          </FlexboxGrid>
        </FlexboxGridItem>
        <FlexboxGridItem colspan={8}>

          <button className='add_options' onClick={() => setPopup(true)}>Add <ArrowDownLineIcon /></button>

          {popup && (
            <ClickAwayListener onClickAway={() => setPopup(false)}>
              <div className='popUp'>
              <li className='popUp_li'>
                <ButtonGroup>
                  <Button appearance="link" className='add_link' as={NavLink} href={`/addReport/${props.patientId}`}>Report <DetailIcon className='icon_option' /></Button>
                </ButtonGroup>
               </li>
               <li className='popUp_li'>
                <ButtonGroup>
                  <Button appearance="link" className='add_link' as={NavLink} href={`/addDrug/${props.patientId}`}>Drug <ScatterIcon className='icon_option_4'/></Button>
                </ButtonGroup>
               </li>
               <li className='popUp_li'>
                <ButtonGroup>
                  <Button appearance="link" className='add_link' as={NavLink} href={`/addAnalysis/${props.patientId}`}>Invistigation <VisibleIcon className='icon_option_2' /></Button>
                </ButtonGroup>
               </li>
               <li className='popUp_li'>
                <ButtonGroup>
                  <Button appearance="link" className='add_link' as={NavLink} href={`/addOperation/${props.patientId}`}>Operation <LineChartIcon className='icon_option_3' /></Button>
                </ButtonGroup>
               </li>
              </div>
            </ClickAwayListener>
          )}

          {/* <IconButton icon={<PlusIcon />} color='yellow' appearance="primary" circle size='lg' as={NavLink} href={`/addReport/${props.patientId}`} /> */}
          <ButtonToolbar>

          </ButtonToolbar>
        </FlexboxGridItem>
      </FlexboxGrid>
      <hr />
    </div>

  )
}

export default DoctorPatientListItem