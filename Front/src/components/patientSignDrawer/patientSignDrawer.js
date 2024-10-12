import { Drawer } from 'rsuite';
import { React, useState } from 'react';
import PatientSignUp from '../patientSignUp/patientSignUp';
import "./patientSignDrawer.css"



const PatientSignDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <img src={require("../../images/patient_user3.png")} height="240" alt='' className='homeUserImg' onClick={() => { setOpen(true)}}/>
      <h1 className='signHeader'>Patient</h1>
      <div className='patientDrawer'>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Drawer.Body>
            <PatientSignUp />
          </Drawer.Body>
        </Drawer>
      </div>


    </div>
  )
}

export default PatientSignDrawer