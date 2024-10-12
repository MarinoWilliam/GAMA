import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from '../DoctorSearch/Filter';
import OperationListItem from '../operationListItem/operationListItem';




const OperationsSearch = ({ listCallback, flagCallback, patId }) => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [callFlag, setCallFlag] = useState(true);
    const [list, setList] = useState([]);

    if (callFlag) {
        try {
            fetch(`http://localhost:8000/myOperations/${patId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((operations) => {
                    setCallFlag(false)
                    let temList = []
                    operations.forEach((operation) => {
                        temList.push({ id: operation._id, name: operation.type, procedure: operation.procedure, date: operation.date , doctorName:operation.doctorName});
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

        let newOperations = finalList.map((operation) => {
            return (
                <OperationListItem title={operation.name} procedure={operation.procedure} operationId={operation.id} date={operation.date}doctorName={operation.doctorName}/>
            )
        })
        listCallback(newOperations)
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
                    placeholder="Search Operations"
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

export default OperationsSearch;
