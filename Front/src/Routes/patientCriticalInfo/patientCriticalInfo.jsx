import { React, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { FlexboxGrid } from 'rsuite'
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem'
import "./patientCriticalInfo.scss"
import PatientSideNavbar from '../../components/sideNavbar/patientSideNavbar';
import { Navigate } from "react-router-dom";


const PatientCriticalInfo = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [openKeys, setOpenKeys] = useState(['3', '4']);
  const [expanded, setExpand] = useState(false);
  const [auth, setAuth] = useState(true);
  const [patient, setpatient] = useState("")

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

    return (
      <div className='container'>
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
            <h1>Critical and Emergency Information</h1>
            <div className='criticalInfo_container'>
              <div className="criticalInfo_card">
                <h2>Emergency Contact:</h2>
                <div className='card_content'>
                  <ul>
                    <li>Name: <span>**** ****</span></li>
                    <li>Relation: <span>Brother</span></li>
                    <li>Phone Number: <span>01234456789</span></li>
                  </ul>
                </div>
              </div>
              <div className="criticalInfo_card">
                <h2>Chronic Health Conditions:</h2>
                <div className='card_content'>
                  <ul>
                    <li>Asthma: <span>No</span></li>
                    <li>Diabetes: <span>No</span></li>
                    <li>High Blood Pressure: <span>Yes</span></li>
                  </ul>
                </div>
              </div>
              <div className="criticalInfo_card">
                <h2>Family History Conditions:</h2>
                <div className='card_content'>
                  <ul>
                    <li>Heart Disease: <span>Yes</span></li>
                    <li>Cancer: <span>No</span></li>
                    <li>Diabetes: <span>Yes</span></li>
                  </ul>
                </div>
              </div>
              <div className="criticalInfo_card">
                <h2>Allergies:</h2>
                <div className='card_content'>
                  <ul>
                    <li>Drug Allergies: <span>Yes</span></li>
                    <li>Food Allergies: <span>No</span></li>
                    <li>Environmental Allergies: <span>Yes</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </FlexboxGridItem>

        </FlexboxGrid>
      </div>
    )
  }

export default PatientCriticalInfo