import { React, useState, useRef } from 'react'
import { Form, Schema ,InputGroup} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import "./homeSearch.css"

// users serial code data for search
//model for checking data validation
const model = Schema.Model({
  serial: Schema.Types.StringType().isRequired('This field is required.'),
  
});

const HomeSearch = () => {
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    serial: ''
});
const handleSubmit = async (e) => {
  console.log(formValue.serial);
  // e.preventDefault();
  // try {
  //   let res = await fetch("http://localhost:8000/patient/BasicInfo", {
  //     method: "POST",
  //     body: JSON.stringify(formValue),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'include',
  //   });
  //   let resJson = await res.json();
  //   if (res.status === 200) {
  //     console.log("Sent Successfully");
  //     console.log(resJson.patientsPending);
  //   } else {
  //     console.log("Some error occured");
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
};
  return (
    <div className='homeSearch'>
        <h1 className='searchTitle'> Supervise Your Loved Ones </h1>
        <Form
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        model={model}
        fluid
      >
        <InputGroup>
          <Form.Control name={formValue.serial} placeholder="Enter The Serial Code"/>
            {/* <Input placeholder="Enter The Serial Code" as={Form}/> */}
          <InputGroup.Button onClick={handleSubmit} appearance="primary" color="orange" type="submit">
            <SearchIcon />
              Search
          </InputGroup.Button>
        </InputGroup>
        </Form>
    </div>
  )
}

export default HomeSearch