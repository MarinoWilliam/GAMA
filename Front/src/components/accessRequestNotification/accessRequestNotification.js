import React from 'react'
import { FlexboxGrid, Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import "./accessRequestNotification.css"
import CloseIcon from '@rsuite/icons/Close';
import CheckIcon from '@rsuite/icons/Check';
import './accessRequestNotification.css'


const accessRequestNotification = (props) => {
  const onClickAcceptHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8000/patient/addDoctor/${props.doctorId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        console.log("Doctor Added Successfully");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();

  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      window.location.replace(`/ShowDocForAny/${props.doctorId}`);
    } catch (err) {
      console.log(err);
    }
  }

  const onClickRejectHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8000/patient/rejectDoctor/${props.doctorId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        console.log("Doctor Rejected Successfully");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }
  return (
    <div className='notification'>
      <FlexboxGrid justify='space-between' align='middle'>
        <FlexboxGridItem colspan={12}>
          <FlexboxGrid justify='space-between'>
            <FlexboxGridItem colspan={8}>
              {(props?.photo) ? (
                <img src={props.photo} alt='userImg' className='notfImg' />
              ) : (
                <img src={require("../../images/userImg.png")} alt='userImg' className='notfImg' />
              )}
              {/* <img src={require("../../images/userImg.png")} alt='userImg' className='notfImg'/> */}
            </FlexboxGridItem>
            <FlexboxGridItem colspan={11}>
            <Button appearance="link" className='doc_link' onClick={handleClick}>
                <h3 className='doc_name'>{props.doctorName}</h3>
              </Button>
              <p className='doc_spec'> {props.medicalField}</p>
            </FlexboxGridItem>
          </FlexboxGrid>
        </FlexboxGridItem>
        <FlexboxGridItem colspan={7}>
          <ButtonToolbar>
            <ButtonGroup>
              <Button appearance="primary" className='reject_btn' onClick={onClickRejectHandler}>Reject <CloseIcon /></Button>
              <Button appearance="primary" className='accept_btn' onClick={onClickAcceptHandler}>Accept <CheckIcon /></Button>
            </ButtonGroup>
          </ButtonToolbar>
        </FlexboxGridItem>
      </FlexboxGrid>
      <hr />
    </div>

  )
}

export default accessRequestNotification