import { React, useState, useEffect, useRef } from 'react'
import { Schema, Button, FlexboxGrid, Form, Drawer, SelectPicker, Radio, RadioGroup, DatePicker } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import PatientSideNavbar from '../../components/sideNavbar/patientSideNavbar';
import PatientProfile from '../../components/patientProfileDrawer/patientProfileDrawer';
import ImageIcon from '@rsuite/icons/Image';
import "./patientBasicInfo.scss"
import { useParams } from 'react-router-dom';
import Field from '../../components/inputField/Field';
import { Navigate } from "react-router-dom";


//model for checking data validation
const basicInfoModel = Schema.Model({
    firstName: Schema.Types.StringType().isRequired('This field is required.'),
    lastName: Schema.Types.StringType().isRequired('This field is required.'),
    guardianNumber: Schema.Types.StringType().isRequired('This field is required.'),
    birthdate: Schema.Types.DateType().isRequired('This field is required.'),
    country: Schema.Types.StringType().isRequired('This field is required.'),
    town: Schema.Types.StringType().isRequired('This field is required.'),
    city: Schema.Types.StringType().isRequired('This field is required.'),
    gender: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
});

const bodyInfoModel = Schema.Model({
    bloodType: Schema.Types.StringType().isRequired('This field is required.'),
    height: Schema.Types.NumberType().isRequired('This field is required.'),
    weight: Schema.Types.NumberType().isRequired('This field is required.'),
    basal_metabolic_rate: Schema.Types.NumberType().isRequired('This field is required.'),
    body_fat_percentage: Schema.Types.NumberType().isRequired('This field is required.'),
    body_mass_index: Schema.Types.NumberType().isRequired('This field is required.'),
    body_water: Schema.Types.NumberType().isRequired('This field is required.'),
    lean_body_mass: Schema.Types.NumberType().isRequired('This field is required.'),
    muscle_mass: Schema.Types.NumberType().isRequired('Please enter a valid email address.'),
    visceral_fat_level: Schema.Types.NumberType().isRequired('Please enter a valid email address.'),


});

// Selection Data 
const CountryData = ['Egypt', 'Saudi Arabia', 'Maroco', 'Tunsia', 'Lebanon', 'Iraq', 'Algeria', 'Kweit', 'Qatar'].map(
    item => ({ label: item, value: item })
);
const CityData = ['Cairo', 'Alexandria', 'Daqahlia', 'Qalyoubia', 'Gharbia', 'Sharqia', 'Aswan', 'Luxor'].map(
    item => ({ label: item, value: item })
);
const TownData = ['Cairo', 'Tanta', 'Mansoura', 'Zagazig', 'Benha', 'Sadat', '6th October', 'Giza'].map(
    item => ({ label: item, value: item })
);
const PatientBasicInfo = () => {
    const [activeKey, setActiveKey] = useState('1');
    const [openKeys, setOpenKeys] = useState(['3', '4']);
    const [expanded, setExpand] = useState(false);
    const [patient, setpatient] = useState("")
    const [bodyInfoEditMode, setbodyInfoEditMode] = useState(false)
    const [basicInfoEditMode, setbasicInfoEditMode] = useState(false)
    const [open, setOpen] = useState(false);
    const location = patient ? `${patient.location}`.split(',') : [];
    const basicInfoFormRef = useRef();
    const bodyInfoFormRef = useRef();
    const [auth, setAuth] = useState(true);

    const [basicInfoFormValue, setBasicInfoFormValue] = useState({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        guardianNumber: patient.guardianNumber,
        birthdate: new Date(),
        gender: patient.gender,
        city: `${location[1]}`,
        country: `${location[2]}`,
        town: `${location[0]}`
    });
    const [bodyInfoFormValue, setBodyInfoFormValue] = useState(patient ? {
        bloodType: patient.bodyBasicInfo.bloodType,
        height: patient.bodyBasicInfo.height,
        weight: patient.bodyBasicInfo.weight,
        basal_metabolic_rate: patient.bodyBasicInfo.basal_metabolic_rate,
        body_fat_percentage: patient.bodyBasicInfo.body_fat_percentage,
        body_mass_index: patient.bodyBasicInfo.body_mass_index,
        body_water: patient.bodyBasicInfo.body_water,
        lean_body_mass: patient.bodyBasicInfo.lean_body_mass,
        muscle_mass: patient.bodyBasicInfo.muscle_mass,
        visceral_fat_level: patient.bodyBasicInfo.visceral_fat_level,

    } : {});

    const { userId } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8000/patient/${userId}`, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.str === 'notAuthorized' || data.str === 'notUser') {
                    setAuth(false)
                } else {
                    setpatient(data);
                }
            });
    }, [userId]);

    const bodyBasicInfoArray = patient ? [
        {
            "label": "Blood Type",
            "value": patient.bodyBasicInfo.bloodType,
            "name": "bloodType"
        },
        {
            "label": "Height",
            "value": patient.bodyBasicInfo.height,
            "name": "height"
        },
        {
            "label": "Weight",
            "value": patient.bodyBasicInfo.weight,
            "name": "weight"

        },
        {
            "label": "Muscle Mass",
            "value": patient.bodyBasicInfo.muscle_mass,
            "name": "muscle_mass"

        },
        {
            "label": "Lean Body Mass",
            "value": patient.bodyBasicInfo.lean_body_mass,
            "name": "lean_body_mass"
        },
        {
            "label": "Body Fat Percentage",
            "value": patient.bodyBasicInfo.body_fat_percentage,
            "name": "body_fat_percentage"

        },
        {
            "label": "Body Water",
            "value": patient.bodyBasicInfo.body_water,
            "name": "body_water"

        },
        {
            "label": "Visceral Fat Level",
            "value": patient.bodyBasicInfo.visceral_fat_level,
            "name": "visceral_fat_level"

        },
        {
            "label": "Body Mass Index",
            "value": patient.bodyBasicInfo.body_mass_index,
            "name": "body_mass_index"

        },
        {
            "label": "Basal Metabolic Rate",
            "value": patient.bodyBasicInfo.basal_metabolic_rate,
            "name": "basal_metabolic_rate"

        }
    ] : [];
    const bodyInfo_editBtn_handler = () => {
        setbodyInfoEditMode(true)
    }
    const bodyInfo_saveBtn_handler = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8000/edit/${userId}`, {
                method: "PUT",
                body: JSON.stringify({
                    bodyBasicInfo: { ...bodyInfoFormValue }
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("User Basic Info Updated successfully", resJson);

            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
        setbodyInfoEditMode(false)
    }

    const basicInfo_editBtn_handler = () => {

        setbasicInfoEditMode(true)
    }
    const basicInfo_saveBtn_handler = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8000/edit/${userId}`, {
                method: "PUT",
                body: JSON.stringify(basicInfoFormValue),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("User Basic Info Updated successfully", resJson);

            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
        setbasicInfoEditMode(false)
    }


    if (!auth) {
        return <Navigate replace to="/noAccess" />;
    } else {

        return (
            <div className='container'>
                <div className='patientDrawer'>
                    <Drawer open={open} onClose={() => setOpen(false)}>
                        <Drawer.Body>
                            <PatientProfile />
                        </Drawer.Body>
                    </Drawer>
                </div>
                <FlexboxGrid>
                    {/* SideNavbar */}
                    <FlexboxGridItem colspan={1}>
                        <div className='sideNavbar'>
                            <PatientSideNavbar
                                activeKey={activeKey}
                                openKeys={openKeys}
                                onSelect={setActiveKey}
                                onOpenChange={setOpenKeys}
                                expanded={expanded}
                                onExpand={setExpand}
                                appearance="default"
                            />
                        </div>
                    </FlexboxGridItem >
                    {/* All Page Content */}
                    <FlexboxGridItem colspan={23}>
                        <div className='basicInfo'>
                            <div className='infoCard'>
                                <FlexboxGrid justify='space-between'>
                                    <FlexboxGridItem colspan={6}>
                                        <div className="ImgContainer">
                                            {(patient?.profilePicture?.url) ? (
                                                <img src={patient.profilePicture.url} alt='userImg' className='userImg image' />
                                            ) : (
                                                <img src={require("../../images/userImg.png")} alt='userImg' className='userImg image' />
                                            )}
                                            <div className="middle">
                                                <Button appearance='primary' color='orange' onClick={() => { setOpen(true) }}><ImageIcon /> Change</Button>
                                            </div>
                                        </div>

                                    </FlexboxGridItem>
                                    <FlexboxGridItem colspan={16}>
                                        <h1>{patient.fullName}</h1>
                                        <FlexboxGrid align='bottom'>
                                            <FlexboxGridItem>

                                                {
                                                    basicInfoEditMode ?
                                                        <Form layout='vertical'
                                                            ref={basicInfoFormRef}
                                                            onChange={setBasicInfoFormValue}
                                                            formValue={basicInfoFormValue}
                                                            model={basicInfoModel}
                                                            onSubmit={basicInfo_saveBtn_handler}>
                                                            <Form.Group>
                                                                <Form.ControlLabel>First Name:</Form.ControlLabel>
                                                                <Form.Control placeholder="Name: Ex. Ahmed" name='firstName' defaultValue={`${patient.firstName}`} />
                                                                <Form.ControlLabel>Last Name:</Form.ControlLabel>
                                                                <Form.Control placeholder="Name: Ex. Ibrahim" name='lastName' defaultValue={`${patient.lastName}`} />
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <div style={{ display: 'flex', gap: 10 }}>
                                                                    <Field
                                                                        name="country"
                                                                        label="Country"
                                                                        accepter={SelectPicker}
                                                                        data={CountryData} placeholder="Country"
                                                                        defaultValue={`${location[2]}`}
                                                                    />
                                                                    <Field
                                                                        name="city"
                                                                        label="City"
                                                                        accepter={SelectPicker}
                                                                        data={CityData} placeholder="City"
                                                                        defaultValue={`${location[1]}`}
                                                                    />
                                                                    <Field
                                                                        name="town"
                                                                        label="Town"
                                                                        accepter={SelectPicker}
                                                                        data={TownData} placeholder="town"
                                                                        defaultValue={`${location[0]}`}
                                                                    />
                                                                </div>

                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Field
                                                                    accepter={DatePicker}
                                                                    name="birthdate"
                                                                    label="Date of Birth"

                                                                />
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Field
                                                                    name="gender"
                                                                    label="Gender"
                                                                    accepter={RadioGroup}
                                                                    inline
                                                                    appearance="picker"
                                                                    defaultValue="male"
                                                                >
                                                                    <Radio value={'male'}>Male</Radio>
                                                                    <Radio value={'female'}>Female</Radio>
                                                                </Field>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.ControlLabel>Guardian Number:</Form.ControlLabel>
                                                                <Form.Control placeholder="Guardian Number" name='guardianNumber' defaultValue={`${patient.guardianNumber}`} />
                                                            </Form.Group>
                                                        </Form>
                                                        :
                                                        <>
                                                            <h5>Location:  <span className='infoValues'>{patient.location}</span></h5>
                                                            <h5> Age:   <span className='infoValues'>{patient.age}</span></h5>
                                                            <h5> Gender:   <span className='infoValues'>{patient.gender}</span></h5>
                                                            <h5>Guardian Number:  <span className='infoValues'>{patient.guardianNumber}</span></h5>
                                                        </>

                                                }

                                            </FlexboxGridItem>
                                        </FlexboxGrid>
                                    </FlexboxGridItem>
                                    <FlexboxGridItem colspan={1.5}>
                                        {
                                            basicInfoEditMode ?
                                                <Button color='green' appearance="primary" onClick={basicInfo_saveBtn_handler} size='lg' type='submit'>Save</Button>
                                                :
                                                <Button color='orange' appearance="primary" onClick={basicInfo_editBtn_handler} size='lg'>Edit</Button>
                                        }
                                    </FlexboxGridItem>
                                </FlexboxGrid>
                            </div>
                            <div className='infoCard'>
                                <FlexboxGrid justify='space-between'>
                                    <FlexboxGridItem>
                                        <h1>Body Basic Information</h1>
                                    </FlexboxGridItem>
                                    <FlexboxGridItem>
                                        {
                                            bodyInfoEditMode ?
                                                <Button color='green' appearance="primary" onClick={bodyInfo_saveBtn_handler} size='lg' type='submit'>Save</Button>
                                                :
                                                <Button color='orange' appearance="primary" onClick={bodyInfo_editBtn_handler} size='lg'>Edit</Button>
                                        }
                                    </FlexboxGridItem>
                                </FlexboxGrid>

                                <FlexboxGrid justify='space-between' >
                                    {
                                        bodyBasicInfoArray.map((info, index) => {
                                            return (
                                                <FlexboxGridItem colspan={8}>

                                                    <Form layout="inline"
                                                        ref={bodyInfoFormRef}
                                                        onChange={setBodyInfoFormValue}
                                                        formValue={bodyInfoFormValue}
                                                        model={bodyInfoModel}
                                                        onSubmit={bodyInfo_saveBtn_handler}>
                                                        <h2 className='infoLabel'>{info.label}: </h2>
                                                        <Form.Group controlId="username-8" className='infoForm'>
                                                            {
                                                                bodyInfoEditMode ?
                                                                    <Form.Control placeholder={`${info.label}`} name={`${info.name}`} defaultValue={`${info.value}`} style={{ width: "10vw" }} />
                                                                    :
                                                                    <h1>{info.value}</h1>
                                                            }

                                                        </Form.Group>


                                                    </Form>

                                                </FlexboxGridItem>
                                            )
                                        })
                                    }

                                </FlexboxGrid>
                            </div>
                        </div>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </div>
        )
    }
}

export default PatientBasicInfo