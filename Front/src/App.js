import { useState, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from "./components/navbar/navbar"
import GamaHome from './Routes/GAMA_Home/GamaHome';
import PatientHome from './Routes/patientHome/patientHome';
import PatientRecordCollections from './Routes/patientRecordCollections/patientRecordCollections';
import PatientBasicInfo from './Routes/patientBasicInfo/patientBasicInfo';
import AddReportForm from './Routes/addReportForm/addReportForm';
import AddAnalysisForm from './Routes/addAnalysisForm/addAnalysisForm';
import AddDrugForm from './Routes/addDrugForm/addDrugForm';
import AddOperationForm from './Routes/addOperationForm/addOperationForm';
import "./App.css"
import { CustomProvider } from 'rsuite';
import SigninSignup from './Routes/SigninSignup/signinSignup';
import DoctorHome from './Routes/doctorHome/doctorHome';
import DocStats from './Routes/docStats/docStats';
import AboutUs from './Routes/aboutUs/aboutUs';
import NoAccess from './Routes/noAccess/noAccess';
import ContactUs from './Routes/contactUs/contactUs';
import PatientCriticalInfo from './Routes/patientCriticalInfo/patientCriticalInfo';
import PatientLabTests from './Routes/patientLabTests/patientLabTests';
import PatientScans from './Routes/patientScans/patientScans';
import ShowPatForDoc from './Routes/showPatForDoc/showPatForDoc';
import ShowDocForAny from './Routes/showDocForAny/showDocForAny';
import DoctorSubscribtion from './Routes/doctorSubscribtion/doctorSubscribtion'




function App() {

  const [activeKey, setActiveKey] = useState(null);
  // theme mode code
  const [toggleMode, setToggleMode] = useState(
    localStorage.getItem('toggle-mode') === 'true'
  );
  useEffect(() => {
    localStorage.setItem('toggle-mode', toggleMode);
  }, [toggleMode]);

  const toggleModeFunc = () => {
    setToggleMode(!toggleMode);
  };


  return (
    <CustomProvider theme={toggleMode ? 'dark' : 'light'}>
      <CustomNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} themeFun={toggleModeFunc} toggleMode={toggleMode} />
      <div className="AppContainer">
        <Routes>
          <Route path='/' index element={<GamaHome />} />
          <Route path='/patientHome/:userId' element={<PatientHome />} />

          <Route path='/patientRecordCollections/:userId' element={<PatientRecordCollections />} />
          {/* Patient Medical History Categories */}
          <Route path='/patientCriticalInfo/:userId' element={<PatientCriticalInfo />} />
          <Route path='/patientLabTests/:userId' element={<PatientLabTests />} />
          <Route path='/patientScans/:userId' element={<PatientScans />} />
          <Route path='/patientBasicInfo/:userId' element={<PatientBasicInfo />} />
          <Route path='/ShowPatForDoc/:patId' element={<ShowPatForDoc />} />
          <Route path='/ShowDocForAny/:docId' element={<ShowDocForAny />} />
          <Route path='/DoctorSubscribtion' element={<DoctorSubscribtion />} />

          <Route path='/doctorHome/:userId' element={<DoctorHome />} />
          <Route path='/docStats/:userId' element={<DocStats />} />

          <Route path='/signin_signup' element={<SigninSignup />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/noAccess' element={<NoAccess />} />
          <Route path='/addReport/:patientId' element={<AddReportForm />} />
          <Route path='/addAnalysis/:patientId' element={<AddAnalysisForm />} />
          <Route path='/addDrug/:patientId' element={<AddDrugForm />} />
          <Route path='/addOperation/:patientId' element={<AddOperationForm />} />

        </Routes>
      </div>
    </CustomProvider>
  );
}

export default App;
