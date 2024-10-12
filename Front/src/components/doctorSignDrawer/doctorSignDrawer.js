import { React } from 'react';
import "./doctorSignDrawer.css"


const DoctorSignDrawer = () => {
  const handleClick = () => {
    window.location.replace(`/DoctorSubscribtion`);
  }

  return (
    <div  onClick={handleClick}>
      <img src={require("../../images/Doctor_user.webp")} height="240" alt='' className='homeUserImg' />
      <h1 className=''>Doctor</h1>
    </div>
  )
}

export default DoctorSignDrawer