import { React, useState, useRef, forwardRef } from 'react'
import { Form, Schema, Button, ButtonToolbar , Message } from 'rsuite';

//model for checking data validation
const { StringType } = Schema.Types;
const doctorModel = Schema.Model({
  username: Schema.Types.StringType().isEmail('Please enter a valid email address.'),
  password: StringType().isRequired('This field is required.')
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

const DoctorSignIn = () => {
  const [loginFailed, setloginFailed] = useState(null)
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/doctorLogin", {
        method: "POST",
        body: JSON.stringify(formValue),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      let resJson = await res.json();
      setloginFailed(resJson.loginFailed)
      if ((res.status === 200) && (resJson.loginFailed === 'false')) {
        console.log("Logged In Successfully");
        window.location.replace(`/doctorHome/${resJson.id}`);

      } else {  
        console.log("Wrong Email or password !!");
      }
    } catch (err) {
      console.log("request Failed !!")
      console.log(err);
    }

  };

  let loginMessage;
    if (loginFailed === 'true') {
      loginMessage = <div><Message showIcon type="error" header="Invalid">
                        Wrong Email or Password.
                      </Message><br/></div>;
    } else if (!loginFailed === 'false') {
      loginMessage = <div><Message showIcon type="success" header="Success">
                        Logged in Successfully
                      </Message> <br/></div> ;
                      
    }else{

    }
  return (
    <div>
      <h1 className='signHeader'>Doctor Account</h1>
      <br />
      <Form
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        model={doctorModel}
        fluid
      >
        {loginMessage}
        <TextField name="username" label="Email" />
        <TextField name="password" label="Password" type="password" autoComplete="off" />
        <ButtonToolbar>
          <Button appearance="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <Button>Forgot your password ?</Button>
        </ButtonToolbar>
      </Form>
    </div>
  )
}

export default DoctorSignIn