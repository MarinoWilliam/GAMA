import React from 'react'
import { FlexboxGrid, Button,  IconButton } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import EmailIcon from '@rsuite/icons/Email';
import CloseIcon from '@rsuite/icons/Close';
import "./patient_doctorsListItem.css"
import ModalPopReview from "../modalPopReview/modalPopReview"
import NavLink from "../NavLink/Navlink"



const patientdoctorsListItem = (props) => {
  const onClickRemoveHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8000/patient/removeDoctor/${props.doctorId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        console.log("Doctor Removed Successfully");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='listItem'>
      <FlexboxGrid justify='space-between' align='middle'>
        <FlexboxGridItem colspan={15}>
          <FlexboxGrid justify='space-between'>
            <FlexboxGridItem colspan={8}>
              {(props?.photo) ? (
                <img src={props.photo} alt='userImg' className='notfImg' />
              ) : (
                <img src={require("../../images/userImg.png")} alt='userImg' className='notfImg' />
              )}
            </FlexboxGridItem>
            <FlexboxGridItem colspan={14}>
              <Button appearance="link" className='doc_link' as={NavLink} href={`/ShowDocForAny/${props.doctorId}`}>
                <h3 className='doc_name'>{props.doctorName} <EmailIcon /></h3>
              </Button>
              <p className='doc_spec'>{props.medicalField}</p>
            </FlexboxGridItem>
          </FlexboxGrid>
        </FlexboxGridItem>
        <FlexboxGridItem colspan={2}>
          < ModalPopReview doctorId={props.doctorId} doctorName={props.doctorName} />
        </FlexboxGridItem>

        <FlexboxGridItem colspan={4}>
          <IconButton size="xs" placement="right" color="red" appearance="primary" onClick={onClickRemoveHandler} icon={<CloseIcon />}>Remove</IconButton>

        </FlexboxGridItem>
      </FlexboxGrid>
      <hr />
    </div>

  )
}

export default patientdoctorsListItem