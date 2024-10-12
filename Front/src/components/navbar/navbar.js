import { React, useState, useEffect } from "react";
import { Navbar, Nav, FlexboxGrid, Col, Button, ButtonToolbar, ButtonGroup, Drawer } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import "./navbar.css"
import NavLink from "../NavLink/Navlink";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import AdminIcon from '@rsuite/icons/Admin';
import PhoneFillIcon from '@rsuite/icons/PhoneFill';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { useGlobalState } from '../../index';
import PatientSignIn from '../patientSignIn/patientSignIn';
import DoctorSignIn from '../doctorSignIn/doctorSignIn';
import { redirect } from "react-router-dom";




const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  const [open, setOpen] = useState(false);
  const [drawerActive, setDrawerActive] = useState('patient');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [CaruasalActiveIndex, setCaruasalActiveIndex] = useGlobalState('CaruasalActiveIndex');

  useEffect(() => {
    fetch(`http://localhost:8000/isLoggedIn`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data);
      });
  }, []);
  
  const handlePatientHome = () => {
    window.location.replace(`/patientHome/${isLoggedIn.id}`);
  }
  const handleDoctorHome = () => {
    window.location.replace(`/doctorHome/${isLoggedIn.id}`);
  }




  const handleLogOut = () => {
    fetch(`http://localhost:8000/logOut`, { method: 'POST', credentials: 'include' }, {
    })
      .then(() => {
        window.location.reload(false);
        redirect("/");
      });
  }




  const handleHomeNav = () => {
    setCaruasalActiveIndex(0);
  }

  return (
    <Navbar {...props} className="Gnavbar" appearance="subtle">
      <FlexboxGrid justify="start" align="middle">
        <FlexboxGridItem as={Col} colspan={6} md={6} sm={24} xs={24}>
          <Navbar.Brand as={NavLink} href="/" onClick={handleHomeNav} ><img src={require("../../images/GAMA_logo.png")} alt='GAMA_LOGO' style={{ marginTop: "-2.5vh", height: "10vh" }} /></Navbar.Brand>
        </FlexboxGridItem>
        <FlexboxGridItem as={Col} colspan={18} md={18} sm={24} xs={24}>
          <Nav onSelect={onSelect} activeKey={activeKey} pullRight style={{ marginTop: "1.5vh" }} >
            <Nav.Item eventKey="1" as={NavLink} href="/" onClick={handleHomeNav}>
              <HomeIcon />Home
            </Nav.Item>
            <Nav.Item eventKey="2" as={NavLink} href="/about" icon={<PeoplesIcon />}> About us</Nav.Item>
            <Nav.Item eventKey="4" as={NavLink} href="/contact" icon={<PhoneFillIcon />}>Contact</Nav.Item>
            {(isLoggedIn) ? (
              <Nav.Menu title="Account">
                {(isLoggedIn.type === 'doctor') ? (
                  <Nav.Item  onClick={handleDoctorHome}>My profile</Nav.Item>
                ) : (
                  <Nav.Item  onClick={handlePatientHome}>My profile</Nav.Item>
                )}
                <Nav.Item as={NavLink} href="/" onClick={handleLogOut} size="lg" >
                  LogOut
                </Nav.Item>
              </Nav.Menu>

            ) : (
              <Nav.Item>
                <ButtonToolbar>
                  <ButtonGroup>
                  <Button as={NavLink} href="/" onClick={() => { setOpen(true) }} appearance="ghost" size="lg" color="orange"><AdminIcon /> Login</Button>
                    <Button as={NavLink} href="/signin_signup" appearance="primary" size="lg" color="orange"><AddOutlineIcon /> Sign up</Button>
                    <Drawer open={open} onClose={() => setOpen(false)} style={{ zIndex: "9999" }}>
                      <Drawer.Body >
                        <Navbar appearance="subtle" className="TabNav">
                          <Nav active={drawerActive} onSelect={setDrawerActive} appearance="tabs">
                            <Nav.Item eventKey="patient">
                              Patient
                            </Nav.Item>
                            <Nav.Item eventKey="doctor">Doctor</Nav.Item>
                          </Nav>
                        </Navbar>
                        <div className="signInContainer">
                          {drawerActive === "doctor" ? <DoctorSignIn /> : <PatientSignIn />}
                        </div>
                      </Drawer.Body>
                    </Drawer>
                  </ButtonGroup>
                </ButtonToolbar>
              </Nav.Item>
            )}

          </Nav>
        </FlexboxGridItem>
      </FlexboxGrid>


    </Navbar>



  )
};

export default CustomNavbar

