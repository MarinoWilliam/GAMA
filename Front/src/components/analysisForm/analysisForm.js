import { React, useState, useRef, forwardRef, useEffect } from 'react'
import { Form, Schema, Button, RadioGroup, SelectPicker, Radio, Loader, FlexboxGrid, Placeholder, Divider, Input, DatePicker } from 'rsuite';
import { useParams } from 'react-router-dom';
import NavLink from "../../components/NavLink/Navlink";

import FileUploadIcon from '@rsuite/icons/FileUpload';

import "./analysisForm.css"
//model for checking data validation
const model = Schema.Model({
    type: Schema.Types.StringType().isRequired('This field is required.'),
    title: Schema.Types.StringType().isRequired('This field is required.'),
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
const analysisData = ['ALT Blood Test', 'ADHD Screening', 'Asthma', 'Blood in Urine', 'CD4 Lymphocyte Count', 'MRSA Test', 'CBC Blood Test','Urine analysis'].map(
    item => ({ label: item, value: item })
);
const scanData = ['CT Pregnancy', 'CT brain', 'MRI','X-Ray','MRI', 'Echocardiogram', 'Ultrasound', 'CT scan', 'PET-CT', '3D mammography', 'Transvaginal ultrasound', 'Digital mammography'].map(
    item => ({ label: item, value: item })
);
const labsData = ['Al Borg', 'Horus', 'Cairo Lab', 'Al Nile Scan', 'Alfa Lab', 'Al Mokhtabar', 'Al Shams'].map(
    item => ({ label: item, value: item })
);


const AnalysisForm = () => {
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        type: '',
        title: '',
        notes: '',
        LabTitle: '',
        date: new Date()
    });
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [patient, setpatient] = useState("")
    const { patientId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/patientUnprotected/${patientId}`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                setpatient(data);

            });
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


    const handleAddAnalysis = async () => {
        try {
            let res = await fetch(`http://localhost:8000/addAnalysis/${patientId}`, {
                method: "POST",
                body: JSON.stringify({
                    analysis: image,
                    form: formValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("Analysis added successfully successfully");
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

            <h1 className='analysis_form_title'>Add Invistigation </h1>
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
                onSubmit={handleAddAnalysis}
            >

                <FlexboxGrid justify="start" className='Drop_Report margin_left'>
                    <FlexboxGrid.Item colspan={8}>
                        <Field

                            name="type"
                            label="Type:"
                            accepter={RadioGroup}
                            inline
                            appearance="picker"
                            defaultValue="analysis"
                        >
                            <Radio value={'analysis'}>Analysis</Radio>
                            <Radio value={'scan'}>scan</Radio>
                        </Field>
                    </FlexboxGrid.Item>
                    {formValue.type === 'scan' ? (
                        <div>
                            <FlexboxGrid.Item colspan={18}><Field
                                className='drug_name'
                                name="title"
                                label="Scan Title:"
                                accepter={SelectPicker}
                                data={scanData} placeholder="e.g. PET-CT"
                            />
                            </FlexboxGrid.Item>

                        </div>) : (
                        <div>
                            <FlexboxGrid.Item colspan={18}><Field
                                className='drug_name'
                                name="title"
                                label="Analysis Title:"
                                accepter={SelectPicker}
                                data={analysisData} placeholder="e.g. MRSA Test"
                            />
                            </FlexboxGrid.Item>

                        </div>
                    )}
                </FlexboxGrid>

                <FlexboxGrid justify="start" className='Drop_Report margin_left'>
                    <FlexboxGrid.Item colspan={8}>
                        <Field
                            className='drug_name'
                            name="LabTitle"
                            label="Lab Title:"
                            accepter={SelectPicker}
                            data={labsData} placeholder="e.g. Alpha Scan"
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

                <div className="my_uploader_s">
                    <label for="inputTag">
                        <FileUploadIcon className="FileUploadIcon" />
                        <input
                            className="filInput"
                            type="file"
                            name="file"
                            id="inputTag"
                            placeholder="Invistigation"
                            onChange={uploadImage}
                        />
                        <p className="FileUploadLabel2">Invistigation</p>
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

                <FlexboxGrid justify="start" className='margin_left' >
                    <FlexboxGrid.Item colspan={14}>
                        <Field
                            accepter={DatePicker}
                            name="date"
                            label="Date of Invistigation"
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
                            Add Invistigation
                        </Button>

                    </div>) : (
                    <div>
                        <Button appearance="primary" type="submit" disabled >
                            Add Invistigation
                        </Button>
                    </div>
                )}

            </Form>

        </div>
    )
}

export default AnalysisForm