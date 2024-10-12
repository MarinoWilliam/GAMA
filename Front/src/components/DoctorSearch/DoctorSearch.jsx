import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { searchFilter } from './Filter';
import './DoctorSearch.scss';
import { Form, FlexboxGrid, SelectPicker} from 'rsuite';

let list = [];

try {
  fetch(`http://localhost:8000/allDocs`, { credentials: 'include' })
    .then((response) => response.json())
    .then((doctors) => {
      doctors.forEach((doctor) => {
        list.push({ id: doctor._id, name: doctor.fullName, spec: doctor.speciality ,city:doctor.location.split(',')[1].slice(1)});
      });
    });

} catch (err) {
  console.log(err);
}

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

const DoctorSearch = () => {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValue, setFormValue] = useState({
    speciality: ''
  });
  const dropdownRef = useRef(null);
  const formRef = useRef();

  // click away listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);

  const handleClick = e => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
    if (!visible) {
      setVisible(true);
    }
  };

  const selectItem = item => {
    setSearchValue(item.name);
    setSelectedItem(item.id);
    setVisible(false);
    window.location.replace(`/ShowDocForAny/${item.id}`);
    
  };

  const selectChange = e => {
    console.log(formValue.speciality);
  };

  const SpecialityData = ['ALLERGY AND IMMUNOLOGY', 'CARDIOLOGY', 'COLON AND RECTAL SURGERY', 'DERMATOLOGY', 'GENERAL SURGERY', 'NEUROLOGY', 'VASCULAR SURGERY', 'PATHOLOGY'].map(
    item => ({ label: item, value: item })
  );
  const CityData = ['Cairo', 'Alexandria', 'Daqahlia', 'Qalyoubia', 'Gharbia', 'Sharqia', 'Aswan', 'Luxor'].map(
    item => ({ label: item, value: item })
  );


  return (
    <div className="search_container">
      <FlexboxGrid justify="center" className='flex_grid'>
        <FlexboxGrid.Item colspan={7}>
          <div>
            <Form
              ref={formRef}
              onChange={setFormValue}
            >
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={14}>

                  <Field
                    name="speciality"
                    accepter={SelectPicker}
                    data={SpecialityData}
                    placeholder="Speciality"

                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10}>

                  <Field
                    name="city"
                    accepter={SelectPicker}
                    data={CityData} placeholder="City"
                  />
                </FlexboxGrid.Item>

              </FlexboxGrid>

            </Form>
          </div>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={14}>
          <div tabIndex="0" className="Search_input_container">
            <input
              className="search_input"
              type="text"
              placeholder="Search by name..."
              value={searchValue}
              onChange={handleChange}
              onFocus={() => {
                setVisible(true);
              }}
            />
          </div>
          <div ref={dropdownRef} className={`search_dropdown ${visible ? 'v' : ''}`}>
            {visible && (
              <ul>
                {!list && (
                  <li key="zxc" className="search_dropdown_item">
                    no result
                  </li>
                )}
                {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
                {list &&
                  searchFilter(searchValue, list, formValue.speciality,formValue.city).map(x => (
                    <li
                      key={x.id}
                      onClick={() => selectItem(x)}
                      className="search_dropdown_item"
                    >
                      <div className="item_text1">{x.name}</div>
                      <div className="item_text2">{x.spec}</div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};

export default DoctorSearch;
