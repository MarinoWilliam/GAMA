import { React, useState, useRef, forwardRef, useEffect } from 'react'
import { Form, Schema, Button, SelectPicker, RadioGroup, Radio, FlexboxGrid, Divider, Input, InputNumber } from 'rsuite';
import { useParams } from 'react-router-dom';
import NavLink from "../NavLink/Navlink";


import "./drugForm.css"
//model for checking data validation
const model = Schema.Model({
    drugName: Schema.Types.StringType().isRequired('This field is required.'),
    cause: Schema.Types.StringType().isRequired('This field is required.'),
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
const drugsData = ['Metformin', 'Simvastatin', 'Omeprazole', 'Amlodipine', 'Metrolol', 'Acetaminophen'].map(
    item => ({ label: item, value: item })
);

const causeData = ['Influenza', 'Poliomyelitis', 'Diphtheria', 'SARS', 'Tetanus', 'Viral hrpatitis', 'Chickempox'].map(
    item => ({ label: item, value: item })
);



const ReportForm = () => {
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        drugName: '',
        cause: '',
        doseFactor: '',
        Notes: ''
    });
    const [patient, setpatient] = useState("")
    const [doseValue, setDoseValue] = useState(0);
    const { patientId } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8000/patientUnprotected/${patientId}`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                setpatient(data);

            });

    }, [patientId, patient]);


    const handleAddReport = async () => {
        try {
            let res = await fetch(`http://localhost:8000/addDrug/${patientId}`, {
                method: "POST",
                body: JSON.stringify({
                    dose: doseValue,
                    form: formValue
                }), headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("Drug added successfully successfully");
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

            <h1 className='drug_form_title'>Medical Drug </h1>
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
                onSubmit={handleAddReport}
            >

                <FlexboxGrid justify="start" className='Drop_Report margin_left'>
                    <FlexboxGrid.Item colspan={10}><Field
                        className='drug_name'
                        name="drugName"
                        label="Drug Name :"
                        accepter={SelectPicker}
                        data={drugsData} placeholder="e.g. Metformin"
                    /></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8} className='small_margin_left' ><Field 
                        className='drug_name '
                        name="cause"
                        label="Cause of Use:"
                        accepter={SelectPicker}
                        data={causeData} placeholder="e.g.Influenza"
                    />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

                <FlexboxGrid justify="start" className='Drop_Report margin_left'>
                    <FlexboxGrid.Item colspan={7}>
                        <p className='dose_label'>Dose :</p>
                        <InputNumber postfix="mg." className={'custom-input-number'}  onChange={async (value)=>{
                            console.log(value);
                            await setDoseValue(value)}} />

                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>
                        <Field
                            className='margin_left'
                            name="doseFactor"
                            label="per:"
                            accepter={RadioGroup}
                            inline
                            appearance="picker"
                            defaultValue="day"
                        >
                            <Radio value={'day'}>day</Radio>
                            <Radio value={'month'}>month</Radio>
                        </Field>
                    </FlexboxGrid.Item>
                </FlexboxGrid>


                <FlexboxGrid justify="start"  className='margin_left small_margin_bottom' >
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
                            Add Drug
                        </Button>

                    </FlexboxGrid.Item>
                </FlexboxGrid>


            </Form>

        </div>
    )
}

export default ReportForm