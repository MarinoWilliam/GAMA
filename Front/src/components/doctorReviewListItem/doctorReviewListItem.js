import React, { useState } from 'react';

import { FlexboxGrid, Divider, Rate, ButtonGroup } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import EmailIcon from '@rsuite/icons/Email';
import NavLink from "../NavLink/Navlink";
import VisibleIcon from '@rsuite/icons/Visible';
import DetailIcon from '@rsuite/icons/Detail';
import ClickAwayListener from 'react-click-away-listener';
import ScatterIcon from '@rsuite/icons/Scatter';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import LineChartIcon from '@rsuite/icons/LineChart';

import "./doctorReviewListItem.css"




const DoctorReviewListItem = ({ rDate, rReviewPara, rRating }) => {
  return (
    <div className='listItem review_div'>
      <FlexboxGrid justify='space-around' align='middle' className='review_header'>
        <FlexboxGridItem colspan={8}>
          {rRating && <Rate readOnly defaultValue={parseFloat(rRating)} allowHalf size="xs" />}
        </FlexboxGridItem>
        <FlexboxGridItem colspan={4}>
          <p className='review_date'>{String(rDate).substr(0, 15)}</p>
        </FlexboxGridItem>
      </FlexboxGrid>
      <hr />
      <p className='review_para' >{rReviewPara}</p>
    </div>

  )
}

export default DoctorReviewListItem