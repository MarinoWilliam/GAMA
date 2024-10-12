import { React, useState, useRef, forwardRef, useEffect } from 'react'
import { Form, Schema, Button, Divider ,Drawer} from 'rsuite';
import { FlexboxGrid, Carousel } from 'rsuite';
import { Col } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { useParams } from 'react-router-dom';

import Map from '../../components/map/map';
import ReactMap from '../../components/ReactMapGl/ReactMapGl';
import DoctorPatientListItem from '../../components/DoctorPatientListItem/DoctorPatientListItem';
import MyPatientSearch from '../../components/myPatientSearch/myPatientSearch';
import NavLink from '../../components/NavLink/Navlink';
import {Navigate} from "react-router-dom";
import DoctorProfile from '../../components/doctorProfileDrawer/doctorProfileDrawer';


import "./doctorHome.css"



//model for checking data validation
const model = Schema.Model({
  serial: Schema.Types.StringType().isRequired('This field is required.'),

});



const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const DoctorHome = () => {
  const formRef = useRef();
  const [doctor, setDoctor] = useState("")
  const [myTempPatients, setMyTempPatients] = useState("")
  const [myPatients, setMyPatients] = useState("")
  const [myPatientsFlag, setMyPatientsFlag] = useState(true)
  const [panelIndex, setPanelIndex] = useState(0)
  const [auth, setAuth] = useState(true);
  const [open, setOpen] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/doctor/${userId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.str==='notAuthorized' || data.str==='notUser') { 
          setAuth(false)
        } else {
        setDoctor(data);
        }
      });
  }, [userId])

  useEffect(() => {
    if (doctor) {
      let patientsList = [...doctor.patientsList.map((P) => { return P.patient })];// important note
      if (patientsList.length > 0) {
        let tempPatients = patientsList.map((patient, index) => {
          return (
            <DoctorPatientListItem patientName={patient.fullName} age={patient.age} patientId={patient._id} photo={patient.profilePicture.url} gender={patient.gender} />
          )
        })
        setMyTempPatients(tempPatients)

      } else {
        setMyTempPatients(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>Empty</h5>)

      }
    }
  }, [doctor])


  const [formValue, setFormValue] = useState({
    serial: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/doctor/sendReq", {
        method: "POST",
        body: JSON.stringify(formValue),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Sent Successfully");
        console.log(resJson.patientsPending);
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
  };

  const handleSMS = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/sendSMS", {
        method: "POST",
        body: JSON.stringify(formValue),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Sent Successfully");
        console.log(resJson);
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if(!auth){
    return <Navigate replace to="/noAccess" />;
  }else{

  return (
    <div className='doctorHomeContainer'>
      <Drawer open={open} onClose={() => setOpen(false)}>
          <Drawer.Body>
            <DoctorProfile />
          </Drawer.Body>
        </Drawer>
      <h1 className='sendPara'>Send Access Request to the Patient</h1>
      <br />
      <Form
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        model={model}
        layout="inline"

      >
        <TextField name="serial" label="Patient Serial Number" type="password" autoComplete="off" />
        <Button appearance="primary" type='submit' onClick={handleSubmit} color="orange">
          Send Request
        </Button>
        <Button appearance="primary" type='submit' color="green" onClick={handleSMS}>
          Send Via SMS
        </Button>
      </Form>





      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
          <div className='userDashboardCard'>

            <FlexboxGrid justify="space-between">
              <FlexboxGridItem colspan={10}>
                {(doctor?.profilePicture?.url) ? (
                  <img src={doctor.profilePicture.url} alt='userImg' className='userImg' onClick={() => { setOpen(true) }} />
                ) : (
                  <img src={require("../../images/userImg.png")} alt='userImg' className='userImg' onClick={() => { setOpen(true) }} />
                )}
              </FlexboxGridItem>
              <FlexboxGridItem colspan={13} className='right_userinfo_card'>
                <FlexboxGrid align='bottom' className='info_container'>
                  <FlexboxGridItem colspan={16}>
                    <h2 className='fullName'>{doctor.fullName}</h2>
                    <p className='info'>{doctor.speciality}</p>
                    <p className='info'> Age : {doctor.age}</p>
                    <p className='info'> Gender : {doctor.gender}</p>
                  </FlexboxGridItem>
                  <FlexboxGridItem colspan={8}>
                  </FlexboxGridItem>
                </FlexboxGrid>
              </FlexboxGridItem>
            </FlexboxGrid>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24} >
          <div className='userDashboardCard' >
            {/* {console.log(`lng: ${doctor.geometry.coordinates[0]}`)} */}
            {(doctor?.geometry?.coordinates) ? (
              <ReactMap lng={doctor.geometry.coordinates[1]} lat={doctor.geometry.coordinates[0]} className="mapbox" />
            ) : (
              <Map lng={-30} lat={-30} className="mapbox" />
            )}

          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
          <div className='userDashboardCard myDoctorsCard' >
            <FlexboxGrid justify='space-between' className="my_doc_title">
              <FlexboxGridItem colspan={7} >
                <h2 className='green_sub'>My Patients</h2>

              </FlexboxGridItem>
              <FlexboxGridItem colspan={13} >
                <MyPatientSearch listCallback={setMyPatients} flagCallback={setMyPatientsFlag} />

              </FlexboxGridItem>
            </FlexboxGrid>
            <Divider className='divider' ></Divider>
            <div className='myDoctorsContent scrollable'>
              {(myPatientsFlag) ? (
                myTempPatients
              ) : (
                myPatients
              )}
            </div>
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
          <div className='panels-parent' >
            <Carousel
              className="panelImg"
              activeIndex={panelIndex}
              onSelect={index => {
                setPanelIndex(index);
              }}
            >
              <div className="carousalSlide" style={{ backgroundImage: `url(${require("../../images/ocr4.png")})` }}>
                <h1 className='SliderTextPanel'>
                  View my Medical Stats.
                  <Button as={NavLink} href={`/docStats/${userId}`} size="sm" appearance="primary" color="orange" style={{ marginLeft: "21%" }} >View</Button>
                </h1>
                <p className='sliderPtextPanel'>
                  GAMA provides you with diffrent tools and innovations in addition to your medical statestics helping you with every step in your career.
                </p>
              </div>
              <img src={require("../../images/ocr2.png")} alt='userImg' />
              <img src={require("../../images/ocr2.png")} alt='userImg' />
            </Carousel>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>

    </div>


  )}
}

export default DoctorHome