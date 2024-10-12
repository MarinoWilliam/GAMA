import { React, useState, useRef, forwardRef, useEffect } from 'react'
import { Form, Schema, Button, SelectPicker, Loader, FlexboxGrid, Placeholder, Divider, Input } from 'rsuite';
import { useParams } from 'react-router-dom';
import NavLink from "../NavLink/Navlink";

import FileUploadIcon from '@rsuite/icons/FileUpload';

import "./reportForm.css"
//model for checking data validation
const model = Schema.Model({
    type: Schema.Types.StringType().isRequired('This field is required.'),
    title: Schema.Types.StringType().isRequired('This field is required.'),
});





const Textarea = forwardRef((props, ref) => <Input className='notes' {...props} as="textarea" ref={ref} />);

const TextField = forwardRef((props, ref) => {
    const { name, label, accepter, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
        </Form.Group>
    );
});

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
const allergiesData = ['Drug Allergy', 'Anaphylaxis', 'Asthma', 'Sinusitis', 'Others'].map(
    item => ({ label: item, value: item })
);

const chronicData = ['Anemia', 'Diabetes Melitus DM', 'Hypertension HTN', 'Renal', 'Liver', 'Others'].map(
    item => ({ label: item, value: item })
);


const ReportForm = () => {
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        title: '',
        allergies: '',
        chronic: '',
        type: '',
        notes: '',
    });
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [patient, setpatient] = useState("")
    const { patientId } = useParams();

    useEffect(() => {
        if (!patient) {
            console.log(patient)
            fetch(`http://localhost:8000/patientUnprotected/${patientId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    setpatient(data);

                });
        }
    }, [patientId]);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'GamaUpload')
        setLoading(true)
        const res = await fetch(
            '	https://api.cloudinary.com/v1_1/dqwwqax3d/image/upload',
            {
                method: 'POST',
                body: data,
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
    }


    const handleAddReport = async () => {
        try {
            let res = await fetch(`http://localhost:8000/addReport/${patientId}`, {
                method: "POST",
                body: JSON.stringify({
                    report: image,
                    form: formValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("Report added successfully successfully");
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

            <h1 className='report_form_title'>Add A Report </h1>
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
                ref={formRef}
                onChange={setFormValue}
                formValue={formValue}
                model={model}
                onSubmit={handleAddReport}
            >

                <div className="my_uploader">
                    <label for="inputTag">
                        <FileUploadIcon className="FileUploadIcon" />
                        <input
                            className="filInput"
                            type="file"
                            name="file"
                            id="inputTag"
                            placeholder="Upload a report"
                            onChange={uploadImage}
                        />
                        <p className="FileUploadLabel">Upload a report</p>
                        <br />
                        <span id="imageName"></span>
                    </label>
                </div>
                {loading ? (
                    <div>
                        <Placeholder.Paragraph rows={8} />
                        <Loader backdrop content="loading..." vertical />
                    </div>
                ) : (
                    <div>
                    </div>
                )}
                {image ? (
                    <div>
                        <img src={image} style={{ width: '300px' }} alt='' />

                    </div>) : (
                    <div>
                    </div>
                )}

                <FlexboxGrid justify="start" className='Drop_Report margin_left' >
                    <FlexboxGrid.Item colspan={14}>
                        <TextField name="title" label="Title :" />
                    </FlexboxGrid.Item>

                </FlexboxGrid>
                <FlexboxGrid justify="space-around" className='Drop_Report small_margin_left'>

                    <FlexboxGrid.Item colspan={5}><Field
                        name="allergies"
                        label="allergies :"
                        accepter={SelectPicker}
                        data={allergiesData} placeholder="Drug Allergy"
                    /></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8}><Field
                        name="chronic"
                        label="chronic disease :"
                        accepter={SelectPicker}
                        data={chronicData} placeholder="Liver"
                    />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

                <FlexboxGrid justify="start" className='margin_left small_margin_bottom' >
                    <FlexboxGrid.Item colspan={14}>
                        <Form.Group controlId="notes">
                            <Form.ControlLabel>Notes :</Form.ControlLabel>
                            <Form.Control rows={4} name="notes" accepter={Textarea} />
                        </Form.Group>

                    </FlexboxGrid.Item>
                </FlexboxGrid>



                <Divider className='divider' ></Divider>

                {image ? (
                    <div>
                        <Button appearance="primary" type="submit" >
                            Add Report
                        </Button>

                    </div>) : (
                    <div>
                        <Button appearance="primary" type="submit" disabled >
                            Add Report
                        </Button>
                    </div>
                )}

            </Form>

        </div>
    )
}

export default ReportForm