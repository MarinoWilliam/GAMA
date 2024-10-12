import {React , useState , useRef , forwardRef} from 'react'
import { Form, Schema ,Button ,ButtonToolbar, DatePicker,SelectPicker,RadioGroup,Radio} from 'rsuite';
import Field from '../inputField/Field';

//model for checking data validation
const { StringType } = Schema.Types;
const model = Schema.Model({
    firstName: Schema.Types.StringType().isRequired('This field is required.'),
    lastName: Schema.Types.StringType().isRequired('This field is required.'),
    guardianNumber: Schema.Types.StringType().isRequired('This field is required.'),
    birthdate: Schema.Types.DateType().isRequired('This field is required.'),
    country: Schema.Types.StringType().isRequired('This field is required.'),
    town: Schema.Types.StringType().isRequired('This field is required.'),
    city: Schema.Types.StringType().isRequired('This field is required.'),
    gender: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
    password: StringType().isRequired('This field is required.'),
    verifyPassword: StringType().addRule((value, data) => {
        console.log(data);
        if (value !== data.password) {
            return false;
        }
        return true;
        }, 'The two passwords do not match')
        .isRequired('This field is required.')
  });

const TextField = forwardRef((props, ref) => {
const { name, label, accepter, ...rest } = props;
return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
);
});


// Selection Data 
const CountryData = ['Egypt', 'Saudi Arabia', 'Maroco', 'Tunsia', 'Lebanon', 'Iraq', 'Algeria', 'Kweit' , 'Qatar'].map(
  item => ({ label: item, value: item })
);
const CityData = ['Cairo', 'Alexandria', 'Daqahlia', 'Qalyoubia', 'Gharbia', 'Sharqia', 'Aswan', 'Luxor'].map(
  item => ({ label: item, value: item })
);
const TownData = ['Cairo', 'Tanta', 'Mansoura', 'Zagazig', 'Benha', 'Sadat', '6th October', 'Giza'].map(
  item => ({ label: item, value: item })
);

const PatientSignUp = () => {
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        firstName: '',
        lastName:'',
        email: '',
        guardianNumber:'',
        birthdate:new Date(),
        gender:'',
        city:'',
        country:'',
        town:'',
        password: '',
        verifyPassword: ''
    });

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
          let res = await fetch("http://localhost:8000/patientSignup", {
            method: "POST",
            body: JSON.stringify(formValue),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
          });
          let resJson = await res.json();
          if (res.status === 200) {
            console.log("User created successfully");
            window.location.replace(`/patientHome/${resJson._id}`);
          } else {
            console.log("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };

    const handleCheckEmail = () => {
        formRef.current.checkForField('email', checkResult => {
        console.log(checkResult);
        });
    };
  return (
    <div>
        <h1 className='signHeader'>Create Your Account</h1>
        <p>Have a place to hold all your medical data</p>
        <br/>
        <Form
          ref={formRef}
          onChange={setFormValue}
          formValue={formValue}
          model={model}
          onSubmit={handleSubmit}
        >
            <TextField name="firstName" label="First Name" />
            <TextField name="lastName" label="Last Name" />
            <TextField name="email" label="Email" />
            <TextField name="guardianNumber" label="Guardian Number" />
            <Field
              accepter={DatePicker}
              name="birthdate"
              label="Date of Birth"
            />
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <Field
                name="country"
                label="Country"
                accepter={SelectPicker}
                data={CountryData}  placeholder="Country"
              />
              <Field
                name="city"
                label="City"
                accepter={SelectPicker}
                data={CityData}  placeholder="City"
              />
              <Field
                name="town"
                label="Town"
                accepter={SelectPicker}
                data={TownData}  placeholder="Town"
              />

            </div>
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
            <TextField name="password" label="Password" type="password" autoComplete="off" />
            <TextField
                name="verifyPassword"
                label="Verify password"
                type="password"
                autoComplete="off"
            /> 
            <ButtonToolbar>
                <Button appearance="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={handleCheckEmail}>Check Email</Button>
          </ButtonToolbar>
        </Form>
    </div>
  )
}

export default PatientSignUp