import React from 'react'
import { Panel} from 'rsuite';
import PatientSignDrawer from "../patientSignDrawer/patientSignDrawer"
import DoctorSignDrawer from '../doctorSignDrawer/doctorSignDrawer';
import "./homeUserCard.css"

const homeUserCard = (props) => {
  return (
    <div className='userCard'>
        <Panel>
              {
               (props.title ==="Patient") ? <PatientSignDrawer/>:<DoctorSignDrawer/>
              }
        </Panel>
    </div>
  )
}

export default homeUserCard