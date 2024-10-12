import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from '../DoctorSearch/Filter';
import PatientdoctorsListItem from '../patient_doctorsListItem/patient_doctorsListItem';

import './myDoctorSearch.scss';

let list = [];

try {
    fetch(`http://localhost:8000/myDocs`, { credentials: 'include' })
        .then((response) => response.json())
        .then((doctors) => {

            doctors.forEach((doctor) => {
                list.push({ id: doctor._id, name: doctor.fullName, spec: doctor.speciality, photo: doctor.profilePicture.url });
            });
        });

} catch (err) {
    console.log(err);
}


const MyDoctorSearch = ({ listCallback, flagCallback }) => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');



    const dropdownRef = useRef(null);
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

    const handleChange = async e => {
        setSearchValue(e.target.value);
        let finalList = searchFilter(e.target.value, list)
        if (finalList.length > 0) {

        }

        let newDoctors = finalList.map((doctor) => {
            return (
              <PatientdoctorsListItem doctorName={doctor.name} medicalField={doctor.spec} doctorId={doctor.id} photo={doctor.photo} />
            )
          })
        listCallback(newDoctors)
        flagCallback(false)

        if (!visible) {
            setVisible(true);
        }
    };



    return (
        <div className="search_container">
            <div tabIndex="0" className="Search_input_container">
                <input
                    className="search_input"
                    type="text"
                    placeholder="Search your doctors"
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => {
                        setVisible(true);
                    }}
                />
            </div>
        </div>
    );
};

export default MyDoctorSearch;
