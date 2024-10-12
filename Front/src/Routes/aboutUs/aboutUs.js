import React from 'react'
import "./aboutUs.css"
import { PanelGroup, Panel } from 'rsuite';
import { FlexboxGrid, Button } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import PhoneFillIcon from '@rsuite/icons/PhoneFill';
import NavLink from  '../../components/NavLink/Navlink';


const aboutUs = () => {
  return (
    <div className='aboutContainer'>
      <div className='aboutDev'>
        <FlexboxGrid justify='center' align='top'>
          <FlexboxGridItem colspan={10}>
            <h1 className='title'>About US</h1>
            <p className='mainPar'>GAMA is a leading company in medical services providing integrating system connecting patients and healthcare providers Storing all kinds of medical record in one place.
              The company started in 2022 as a graduation project for a group of students at Cairo University faculty of engineering Systems and Biomedical Department.
            </p>
            <Button as={NavLink} href='/contact'size="lg" color="orange" className='contactBtn' appearance="primary">
              {<PhoneFillIcon />} Contact US
            </Button>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={8} >
            <img src={require("../../images/devTeam.png")} className='aboutPhoto' alt='devTeam' />
          </FlexboxGridItem>
        </FlexboxGrid>
        <PanelGroup className='panel' accordion bordered >
          <Panel className="panelHeader" header="• Medical Bracelet">
            <FlexboxGrid justify='space-between' align='top'>
              <FlexboxGridItem colspan={10}>
                <p className='panelPar'>The medical bracelet will help in reading your svital signs while connecting this data to our servers
                  so that it would make your guardian able to monitor your health state remotely
                  and gives your healthcare provider access to your data and show your emergency contacts to others</p>
                <span><Button size="md" color="green" className='panelBtn' appearance="primary">
                  Purchase Now
                </Button></span>

              </FlexboxGridItem>
              <FlexboxGridItem colspan={8} >
                <img src={require("../../images/gbr.png")} className='braceletePhoto' alt='devTeam' />
              </FlexboxGridItem>
            </FlexboxGrid>
          </Panel>
          <Panel className="panelHeader" header="• Mobile app" >
            <FlexboxGrid justify='space-between' align='top'>
              <FlexboxGridItem colspan={10}>
                <p className='panelPar'>Our mobile app will give you easier access to all our services anywhere
                  providing more features such as QR scanning which will help you interact with the medical ID bracelet
                  and adding medical record using your mobile.</p>
                <span><Button size="md" color="green" className='panelBtn' appearance="primary">
                  download
                </Button></span>

              </FlexboxGridItem>
              <FlexboxGridItem colspan={8} >
                <img src={require("../../images/mobile.png")} className='mobilePhoto' alt='devTeam'/>
              </FlexboxGridItem>
            </FlexboxGrid>

          </Panel>
          <Panel className="panelHeader" header="• Website:" >
            <p className='panelPar'>Our website is where you can have all of the functionality
              For healthcare providers: You can manage your institute records and have access to your patients records.
              For patients: You can view your records and give access to your healthcare providers.</p>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}

export default aboutUs