import { Modal, Button, Loader, FlexboxGrid,Divider } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { React, useState, useEffect } from 'react'

import "./modalPop.css"


const ModalPop = ({ reportId }) => {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(false);
  const [report, setReport] = useState({});


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEntered = () => {
    setTimeout(() => setRows(true), 1000);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/getReport/${reportId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setReport(data)
      });

  }, [reportId]);


  return (
    <div>


      <Button appearance="link" onClick={handleOpen}>
        <p className='moreDetails'>Show details </p>
      </Button>


      <Modal
        open={open}
        size='lg'
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Header className='modal_header'>
          <Modal.Title className='modal_title'>Title : <span className='modal_title_data'>{report.title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rows ? (
            <div className='modal_body'>
              <FlexboxGrid justify="space-between" className='top_modal_grid'>
                <FlexboxGridItem colspan={12}>
                  <p className='modal_label'> Added By: <span className='modal_data'> Dr.{report.doctorName}</span> </p>
                </FlexboxGridItem>
                <FlexboxGridItem colspan={12}>
                  <p className='modal_label'>Date :  <span className='modal_data'>{String(report.date).substr(0, 15)}</span></p>
                </FlexboxGridItem>
              </FlexboxGrid>
              <Divider className='divider margin_divider' ></Divider>
              <img className='modal_image' src={report.images.url} alt='report_image' />
              <FlexboxGrid justify="space-between" className='top_modal_grid'>
                <FlexboxGridItem colspan={12}>
                  {(report.allergies)?(
                    <p className='modal_label'>Allergies discoverd: <span className='red_info'>{report.allergies}</span></p>
                  ):(
                    <p className='modal_label'>Allergies discoverd: <span className='red_info'>None</span></p>
                  )}
                </FlexboxGridItem>
                <FlexboxGridItem colspan={12}>
                  {(report.chronic)?(
                    <p className='modal_label'>Chronic disease discoverd: <span className='red_info'>{report.chronic}</span></p>
                  ):(
                    <p className='modal_label'>Chronic disease discoverd:<span className='red_info'>None</span></p>
                  )}
                </FlexboxGridItem>
              </FlexboxGrid>

              <FlexboxGrid justify="center" className='note_modal_grid'>
                <FlexboxGridItem colspan={12}>
                  {(report.notes)?(
                    <p className='modal_label'>Doctor Notes: <span className='black_info'>{report.notes}</span></p>
                  ):(
                    <p className='modal_label'>Doctor Notes: <span className='black_info'>None</span></p>
                  )}
                </FlexboxGridItem>
              </FlexboxGrid>


            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Loader size="md" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ModalPop

