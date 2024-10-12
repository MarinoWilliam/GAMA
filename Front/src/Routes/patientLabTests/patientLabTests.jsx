import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FlexboxGrid, Timeline } from 'rsuite'
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem'
import "./patientLabTests.scss"
import PatientSideNavbar from '../../components/sideNavbar/patientSideNavbar';
import TimeLineObject from '../../components/timeLineObject/timeLineObject';


const PatientLabTests = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [openKeys, setOpenKeys] = useState(['3', '4']);
  const [expanded, setExpand] = useState(false);
  const [analysis, setAnalysis] = useState([]);
  const [analysisTimeItem, setAnalysisTimeItem] = useState([]);

  const { userId } = useParams();
  const patId=userId
  useEffect(() => {
    try {
      fetch(`http://localhost:8000/myAnalysis/${patId}`, { credentials: 'include' })
        .then((response) => response.json())
        .then((analysis) => {
          setAnalysis(analysis)
          console.log(analysis);
        });
    } catch (err) {
      console.log(err);
    }
  }, [patId])


  useEffect(() => {
      if (analysis.length > 0) {
        let tempAnalysis= analysis.map((ana, index) => {
          return (
            <TimeLineObject doctorName={ana.doctorName} title={ana.title} analysisId={ana._id} date={ana.date} labTitle={ana.labTitle}/>
          )
        })
        setAnalysisTimeItem(tempAnalysis)
      } else {
        setAnalysisTimeItem(<h5 style={{ color: "red", textAlign: "center", marginTop: "7%" }}>Empty</h5>)
      }
  }, [analysis])

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
          <div className="reportContainer">
            <h1>Labs' Analysis</h1>
            <Timeline className="custom-timeline">
              {analysisTimeItem}
            </Timeline>
          </div>
        </FlexboxGridItem>

      </FlexboxGrid>
    </div>
  )
}

export default PatientLabTests