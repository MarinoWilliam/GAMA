import { React, useState, useRef } from 'react'
import { Form, Schema, FlexboxGrid } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import "./homeDoctorSearch.css"
import DoctorSearch from '../../components/DoctorSearch/DoctorSearch';


const model = Schema.Model({
  serial: Schema.Types.StringType().isRequired('This field is required.'),

});

const HomeDoctorSearch = () => {


  return (
    <div className='homeSearchDoc'>
      <h1 className='searchTitleDoc'> Search For Doctors You need </h1>
      <FlexboxGrid justify='center'>
        <DoctorSearch />
      </FlexboxGrid>
    </div>
  )
}

export default HomeDoctorSearch