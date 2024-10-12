import React from 'react'
import { FlexboxGrid, Rate ,Button} from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import EmailIcon from '@rsuite/icons/Email';
import "./doctorSpecItemList.css"

const DoctorSpecItemList = ({ photo, doctorName, rating, location,id }) => {

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      window.location.replace(`/ShowDocForAny/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
    <div className='listItem'>
      <FlexboxGrid justify='space-between' align='middle'>
        <FlexboxGridItem colspan={15}>
          <FlexboxGrid justify='space-between'>
            <FlexboxGridItem colspan={8}>
              {(photo) ? (
                <img src={photo} alt='userImg' className='notfImg' />
              ) : (
                <img src={require("../../images/userImg.png")} alt='userImg' className='notfImg' />
              )}
            </FlexboxGridItem>
            <FlexboxGridItem colspan={14}>
            <Button appearance="link" className='doc_link' onClick={handleClick}>
                <h3 className='doc_name'>{doctorName} </h3>
              </Button>
              <p className='doc_spec'>{location}</p>
            </FlexboxGridItem>
          </FlexboxGrid>
        </FlexboxGridItem>
        <FlexboxGridItem colspan={5}>
          {(rating||(rating===0)) && <Rate readOnly defaultValue={parseFloat(rating)} allowHalf size="xs" />}
        </FlexboxGridItem>
      </FlexboxGrid>
      <hr />
    </div>

  )
}

export default DoctorSpecItemList