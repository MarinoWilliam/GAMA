import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from '../DoctorSearch/Filter';
import DrugListItem from '../drugListItem/drugListItem';




const DrugsSearch = ({ listCallback, flagCallback, patId }) => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [callFlag, setCallFlag] = useState(true);
    const [list, setList] = useState([]);

    if (callFlag) {
        try {
            fetch(`http://localhost:8000/myDrugs/${patId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((drugs) => {
                    setCallFlag(false)
                    let temList = []
                    drugs.forEach((drug) => {
                        temList.push({ id: drug._id, name: drug.drugName, dose: drug.dose, date: drug.date , doseFactor:drug.doseFactor, doctorName:drug.doctorName});
                    });
                    setList(temList)
                });
        } catch (err) {
            console.log(err);
        }
    }



    const handleChange = async e => {
        setSearchValue(e.target.value);
        let finalList = searchFilter(e.target.value, list)
        if (finalList.length > 0) {

        }
        console.log(`finalList : ${finalList}`)

        let newDrugs = finalList.map((drug) => {
            return (
                <DrugListItem title={drug.name}dose={drug.dose} drugId={drug._id} date={drug.date} doseFactor={drug.doseFactor} doctorName={drug.doctorName}/>
            )
        })
        listCallback(newDrugs)
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
                    placeholder="Search Drugs"
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

export default DrugsSearch;
