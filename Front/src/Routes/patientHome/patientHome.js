import { React, useState, useEffect } from 'react'
import { FlexboxGrid, Form, IconButton, Col, Divider } from 'rsuite';
import { Link, useParams } from 'react-router-dom';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import PlusIcon from '@rsuite/icons/Plus';
import "./patientHome.css"
import PatientdoctorsListItem from '../../components/patient_doctorsListItem/patient_doctorsListItem';
import PatientProfile from '../../components/patientProfileDrawer/patientProfileDrawer';
import DoctorSearch from '../../components/DoctorSearch/DoctorSearch';
import AccessRequestNotification from '../../components/accessRequestNotification/accessRequestNotification';
import PatientSideNavbar from '../../components/sideNavbar/patientSideNavbar';
import { Drawer } from 'rsuite';
import MyDoctorSearch from '../../components/myDoctorSearch/myDoctorSearch';
import { Navigate } from "react-router-dom";



const PatientHome = () => {
  // patient data state
  const [patient, setpatient] = useState("")
  const [notifications, setNotifications] = useState("")
  const [myTempDoctors, setMyTempDoctors] = useState("")
  const [myDoctors, setMyDoctors] = useState("")
  const [myDoctorsFlag, setMyDoctorsFlag] = useState(true)
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(true);


  // SideNavbar States
  const [activeKey, setActiveKey] = useState('1');
  const [openKeys, setOpenKeys] = useState(['3', '4']);
  const [expanded, setExpand] = useState(false);
  // id of the patient from the url Params
  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/patient/${userId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.str === 'notAuthorized' || data.str === 'notUser') {
          setAuth(false)
        } else {
          setpatient(data);
        }
      });
      }, [userId]);


    useEffect(() => {
      if (patient) {
        let requests = [...patient.doctorsRequestList];// important note
        if (requests.length > 0) {
          let tempNotifications = requests.map((doctor, index) => {
            return (
              <AccessRequestNotification doctorName={doctor.fullName} medicalField={doctor.speciality} doctorId={doctor._id} photo={doctor.profilePicture.url} />
            )
          })
          setNotifications(tempNotifications)
        } else {
          setNotifications(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>No Requests</h5>)
        }

        let userDoctors = [...patient.doctorsList];
        if (userDoctors.length > 0) {
          let tempDoctors = userDoctors.map((doctor, index) => {
            return (
              <PatientdoctorsListItem doctorName={doctor.fullName} medicalField={doctor.speciality} doctorId={doctor._id} photo={doctor.profilePicture.url} />
            )
          })
          setMyTempDoctors(tempDoctors)
        } else {
          setMyTempDoctors(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>Empty</h5>)
        }
      }

    }, [patient])



    if (!auth) {
      return <Navigate replace to="/noAccess" />;
    } else {

      return (
        <div className='container'>
          <div className='patientDrawer'>
            <Drawer open={open} onClose={() => setOpen(false)}>
              <Drawer.Body>
                <PatientProfile />
              </Drawer.Body>
            </Drawer>
          </div>
          {/* Grid of 2 col (Sidnavbar) & (All page content) */}
          <FlexboxGrid>
            {/* SideNavbar */}
            <FlexboxGridItem colspan={1}>
              <div className='sideNavbar'>
                <PatientSideNavbar
                  activeKey={activeKey}
                  openKeys={openKeys}
                  onSelect={setActiveKey}
                  onOpenChange={setOpenKeys}
                  expanded={expanded}
                  onExpand={setExpand}
                  appearance="default"
                />
              </div>
            </FlexboxGridItem >
            {/* All Page Content */}
            <FlexboxGridItem colspan={23}>
              {/* First row Section */}
              <div>
                <FlexboxGrid justify="space-between">
                  {/* Patient Info Card */}
                  <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                    <div className='userDashboardCard'>

                      <FlexboxGrid justify="space-between">
                        <FlexboxGridItem colspan={5} className='margin_profile_pat'>
                          {(patient?.profilePicture?.url) ? (
                            <img src={patient.profilePicture.url} alt='userImg' className='userImg' onClick={() => { setOpen(true) }} />
                          ) : (
                            <img src={require("../../images/userImg.png")} alt='userImg' className='userImg' onClick={() => { setOpen(true) }} />
                          )}
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={16} className='right_userinfo_card'>
                          <FlexboxGrid align='bottom'>
                            <FlexboxGridItem colspan={20}>
                              <h2 className='fullName'>{patient.fullName}</h2>
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={4}>
                              <p className='info serial'> #{patient.serial}</p>
                            </FlexboxGridItem>
                          </FlexboxGrid>
                          <FlexboxGrid align='bottom' className='info_container'>
                            <FlexboxGridItem colspan={12}>
                              <p className='info'>{patient.location}</p>
                              <p className='info'> Age : {patient.age}</p>
                              <p className='info'> Gender : {patient.gender}</p>
                              <p className='info transparent'> lzom el design</p>
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={8}>
                              <Link className='see_more' to={`/patientBasicInfo/${userId}`}>See More</Link>
                            </FlexboxGridItem>
                          </FlexboxGrid>
                        </FlexboxGridItem>
                      </FlexboxGrid>
                    </div>
                  </FlexboxGrid.Item>
                  {/* Search for Doctors Card */}
                  <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24} >
                    <div className='userDashboardCardSearch '>
                      <h2 className='green_sub'>Search For Doctors</h2>
                      <div className='doctorSearch'>
                        <FlexboxGrid justify='center'>
                          <DoctorSearch />
                        </FlexboxGrid>
                      </div>
                    </div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
                {/* Second Row Section */}
                <FlexboxGrid justify="space-between">
                  {/* Access requests Card */}
                  <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                    <div className='userDashboardCard' >
                      <h2 className='green_sub' >Access Requests</h2>
                      <Divider className='divider' ></Divider>
                      <div className='accessRequestContent scrollable'>
                        {notifications}
                      </div>
                    </div>
                    {/* Monitor Live Data Card */}
                    <div className='userDashboardCardWatch bottom_grid'>
                      <FlexboxGrid justify='space-between' align='top' className='bottom_grid'>
                        <FlexboxGridItem colspan={15}>
                          <h2 className='green_sub'>Monitor Live Data</h2>
                          <Form layout='inline'>
                            <Form.Group controlId="LiveDataID" >
                              <Form.Control placeholder="Serial" name="username" />
                              <Form.Control placeholder="Pin Code" name="password" type="password" autoComplete="off" />
                              <IconButton icon={<PlusIcon />} color="blue" appearance="primary" circle size='lg' />
                            </Form.Group>
                          </Form>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={9} >
                          <img src={require("../../images/braceletImg3.png")} alt='braceletImg' height="200px" />
                        </FlexboxGridItem>
                      </FlexboxGrid>
                    </div>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item as={Col} colspan={12} lg={12} xl={12} sm={24} xs={24}>
                    <div className='userDashboardCard myDoctorsCard' >
                      <FlexboxGrid justify='space-between' className="my_doc_title">
                        <FlexboxGridItem colspan={7} >
                          <h2 className='green_sub'>My Doctors</h2>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={13} >
                          <MyDoctorSearch listCallback={setMyDoctors} flagCallback={setMyDoctorsFlag} />
                          {/* {console.log(myDoclist)} */}
                        </FlexboxGridItem>
                      </FlexboxGrid>
                      <Divider className='divider' ></Divider>
                      <div className='myDoctorsContent scrollable'>
                        {(myDoctorsFlag) ? (
                          myTempDoctors
                        ) : (
                          myDoctors
                        )}
                      </div>
                    </div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </div>

            </FlexboxGridItem>
          </FlexboxGrid>


        </div>
      )
    }
  }

export default PatientHome