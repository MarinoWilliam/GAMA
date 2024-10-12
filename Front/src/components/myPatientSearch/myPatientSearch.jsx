import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from '../DoctorSearch/Filter';
import DoctorPatientListItem from '../DoctorPatientListItem/DoctorPatientListItem';

import './myPatientSearch.scss';

let list = [];

try {
    fetch(`http://localhost:8000/myPats`, { credentials: 'include' })
        .then((response) => response.json())
        .then((patients) => {
            patients.forEach((patient) => {
                list.push({ patientId: patient._id, name: patient.fullName, age: patient.age, photo: patient.profilePicture.url, gender: patient.gender });
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
        console.log(`finalList : ${finalList}`)

        let newPatients = finalList.map((patient) => {
            console.log(`Patient Name : ${patient.name}`)
            return (
                <DoctorPatientListItem patientName={patient.name} age={patient.age} patientId={patient.patientId} photo={patient.photo} gender={patient.gender} />

            )
        })
        listCallback(newPatients)
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
                    placeholder="Search your patients"
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
