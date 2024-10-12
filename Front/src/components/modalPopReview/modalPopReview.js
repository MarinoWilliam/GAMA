import { Modal, Button, Form, FlexboxGrid, Input, Schema, Rate, IconButton } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { React, useState, useEffect, forwardRef, useRef } from 'react'
import PlusIcon from '@rsuite/icons/Plus';
import EditIcon from '@rsuite/icons/Edit';

import "./modalPopReview.css"

const Textarea = forwardRef((props, ref) => <Input className='notes' {...props} as="textarea" ref={ref} />);

const Field = forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const model = Schema.Model({
  rate: Schema.Types.NumberType().isRequired('This field is required.'),
  reviewPara: Schema.Types.StringType(),
});




const ModalPopReview = ({ doctorId, doctorName }) => {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(false);
  const [found, setFound] = useState(false);
  const [initialRate, setInitialRate] = useState(0);
  const [initialReviwPara, setInitialReviwPara] = useState('');
  const [hoverValue, setHoverValue] = useState(3);

  const textsForStars = {
    1: 'Very Bad',
    2: 'Poor',
    3: 'Ok',
    4: 'Very Good',
    5: 'Excellent'
  };

  const handleOpen = () => {
    fetch(`http://localhost:8000/isReviewd/${doctorId}`, { credentials: 'include' })
    .then((response) => response.json())
    .then((data) => {
      if (data.found) {
        setFound(true);
        setInitialRate(data.rate)
        setInitialReviwPara(data.reviewPara)
      }
    });
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    reviewPara: '',
  });

  const handleEntered = () => {
    setTimeout(() => setRows(true), 1000);
  };

  const handleOk = async () => {
    try {
      await fetch(`http://localhost:8000/addReview/${doctorId}`, {
        method: "POST",
        body: JSON.stringify({
          form: formValue,
          rate: hoverValue,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    } catch (err) {
      console.log(err);
    }
    setOpen(false)
  };






  return (
    <div>

      <IconButton size="xs" placement="right" color="orange" appearance="primary" onClick={handleOpen} icon={<EditIcon />}>Review</IconButton>

      <Modal
        open={open}
        size='sm'
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Header className='modal_header'>
          <Modal.Title className='modal_title'><span className='modal_title_data'>Add A Review</span></Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <FlexboxGrid justify="center" className='doc_review_title'>
            <FlexboxGrid.Item colspan={15}>
              <span className='modal_title_data_for'>For:  <span className='modal_title_data_name'>Dr.{doctorName}</span>  </span>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center" className='Drop_Report'>
            <FlexboxGrid.Item colspan={9}>
              <Rate defaultValue={initialRate} onChangeActive={setHoverValue} />{' '}
              <span >{textsForStars[hoverValue]}</span>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center" className='small_margin_bottom' >
            <FlexboxGrid.Item colspan={14}>
              <Form
                ref={formRef}
                onChange={setFormValue}
                formValue={formValue}
                model={model}
              >
                <Form.Group controlId="notes">
                  <Form.ControlLabel>Review :</Form.ControlLabel>
                   <Form.Control rows={4} name="reviewPara" accepter={Textarea} defaultValue={initialReviwPara || ''} />
                </Form.Group>
              </Form>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOk} appearance="primary">
            Ok
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ModalPopReview

