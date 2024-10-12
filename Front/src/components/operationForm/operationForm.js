import { React, useState, useRef, forwardRef, useEffect } from 'react'
import { Form, Schema, Button, SelectPicker, DatePicker, FlexboxGrid, Divider, Input } from 'rsuite';
import { useParams } from 'react-router-dom';
import NavLink from "../../components/NavLink/Navlink";


import "./operationForm.css"
//model for checking data validation
const model = Schema.Model({
    type: Schema.Types.StringType().isRequired('This field is required.'),
    procedure: Schema.Types.StringType().isRequired('This field is required.'),
});





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
// Selection Data 
const SurgeryData = ['Appendectomy', 'Breast biopsy', 'Carotid endarterectomy', 'Cholecystectomy', 'Dilation & curettage', 'Hysterectomy', 'Inguinal hernia', 'Mastectomy', 'Prostatectomy', 'Tonsillectomy'].map(
    item => ({ label: item, value: item })
);

const procedureData = ['Laparoscopy', 'Endoscopy', 'Arthroscopy', 'Bronchoscopy', 'Cystoscopy', 'Gastroscopy', 'Hysteroscopy', 'Sigmoidoscopy'].map(
    item => ({ label: item, value: item })
);



const OperationForm = () => {
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        type: '',
        procedure: '',
        date: new Date(),
        Notes: ''
    });
    const [patient, setpatient] = useState("")
    const { patientId } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8000/patientUnprotected/${patientId}`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                setpatient(data);

            });

    }, [patientId, patient]);


    const handleAddOperation = async () => {
        try {
            let res = await fetch(`http://localhost:8000/addOperation/${patientId}`, {
                method: "POST",
                body: JSON.stringify(formValue),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("Operation added successfully successfully");
                window.location.replace(`/doctorHome/${resJson._id}`);
                // window.location.replace(`/doctorHome/${resJson._id}`);
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div className='reportForm_container'>

            <h1 className='report_form_title'>Operation </h1>
            <FlexboxGrid justify="center" className='name_grid'>
                <FlexboxGrid.Item colspan={4}>
                    <p className='name_label'>For: </p>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={7}>
                    <Button appearance="link" className='name_value' as={NavLink} href={`/ShowPatForDoc/${patientId}`}>{patient.fullName}</Button>

                </FlexboxGrid.Item>
            </FlexboxGrid>

            <br />
            <Divider className='divider' ></Divider>

            <Form
                className='medium_margin_left'
                ref={formRef}
                onChange={setFormValue}
                formValue={formValue}
                model={model}
                onSubmit={handleAddOperation}
            >

                <FlexboxGrid justify="start" className='Drop_Report margin_left'>
                    <FlexboxGrid.Item colspan={10}><Field
                        className='drug_name'
                        name="type"
                        label="Surgery Type :"
                        accepter={SelectPicker}
                        data={SurgeryData} placeholder="e.g. Appendectomy"
                    /></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8} className='small_margin_left' ><Field
                        className='drug_name '
                        name="procedure"
                        label="Procedure:"
                        accepter={SelectPicker}
                        data={procedureData} placeholder="e.g.Endoscopy"
                    />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

                <FlexboxGrid justify="start" className='margin_left' >
                    <FlexboxGrid.Item colspan={14}>
                        <Field
                            accepter={DatePicker}
                            name="date"
                            label="Date of Operation"
                        />

                    </FlexboxGrid.Item>
                </FlexboxGrid>

                <FlexboxGrid justify="start" className='margin_left small_margin_bottom' >
                    <FlexboxGrid.Item colspan={14}>
                        <Form.Group controlId="notes">
                            <Form.ControlLabel>Notes :</Form.ControlLabel>
                            <Form.Control rows={2} columns={300} name="notes" accepter={Textarea} />
                        </Form.Group>

                    </FlexboxGrid.Item>
                </FlexboxGrid>


                <Divider className='divider' ></Divider>
                <FlexboxGrid justify="end" className='margin_left' >
                    <FlexboxGrid.Item colspan={14}>
                        <Button appearance="primary" type="submit" >
                            Add Operation
                        </Button>

                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Form>
        </div>
    )
}

export default OperationForm