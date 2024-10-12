import React from 'react'
import "./contactUs.css"
import { FlexboxGrid, Stack } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';



const aboutUs = () => {
  return (
    <div className='contactContainer'>
      <div className='contactDev'>
        <h1 className='title'>How can we help?</h1>
        <Stack wrap spacing={6}>
        </Stack>
        <FlexboxGrid justify='center' className='topline' align='center' >
          <FlexboxGridItem colspan={8}>
            <img src={require("../../images/email.png")} className='email' alt='devTeam' />
            <h2 className='subTitleemail'>Send us an email</h2>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={8} >
            <img src={require("../../images/cc.png")} className='cvPhoto' alt='devTeam' />
            <h2 className='subTitleCv'>Apply for a job</h2>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={8} >
            <img src={require("../../images/nurse2.png")} className='doctor' alt='devTeam' />
            <h2 className='subTitleDoc'>Medical suggestions</h2>
          </FlexboxGridItem>
        </FlexboxGrid>
        <FlexboxGrid justify='center' className='topline' align='center' >
          <FlexboxGridItem colspan={8}>
            <img src={require("../../images/buissnes.png")} className='man' alt='devTeam' />
            <h2 className='subTitleJop'>You're a corporation</h2>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={8}>
            <img src={require("../../images/danger.png")} className='danger' alt='devTeam' />
            <h2 className='subTitleDanger'>Report</h2>
          </FlexboxGridItem>
        </FlexboxGrid>


      </div>
    </div>
  )
}

export default aboutUs