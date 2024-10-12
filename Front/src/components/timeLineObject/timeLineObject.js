import React from 'react'
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import PageIcon from '@rsuite/icons/Page';
import "./timeLineObject.css"
import {  IconButton, Timeline } from 'rsuite'
import UserIcon from '@rsuite/icons/legacy/User';



const TimeLineObject = (props) => {


  return (
    <Timeline.Item dot={<UserIcon />}>
                <p>{String(props.date).substr(0, 15)}</p>
                <div className="reportCard">
                  <div className='report_Title'>
                    <h3>{props.title}</h3>
                    <h5>{props.labTitle}</h5>
                  </div>
                  <div className='reportFile_section'>
                    <div className='reportFile'>
                      <h4><PageIcon />{props.title}.png</h4>
                      <IconButton
                        appearance="primary"
                        color="orange"
                        size="lg"
                        icon={<FileDownloadIcon />}
                      />
                    </div>
                    <h4>{props.doctorName}</h4>
                  </div>
                </div>
              </Timeline.Item>
  )
}

export default TimeLineObject