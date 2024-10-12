import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from '../DoctorSearch/Filter';
import ReportListItem from '../reportListItem/reportListItem';




const ReportsSearch = ({ listCallback, flagCallback, patId }) => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [callFlag, setCallFlag] = useState(true);
    const [list, setList] = useState([]);

    if (callFlag) {
        try {
            fetch(`http://localhost:8000/myReports/${patId}`, { credentials: 'include' })
                .then((response) => response.json())
                .then((reports) => {
                    setCallFlag(false)
                    let temList = []
                    reports.forEach((report) => {
                        temList.push({ id: report._id, name: report.title, medicalField: report.medicalField, photo: report.images.url, date: report.date , doctorName:report.doctorName});
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

        let newReports = finalList.map((report) => {
            return (
                <ReportListItem title={report.name} medicalField={report.medicalField} reportId={report.id} date={report.date} photo={report.photo} doctorName={report.doctorName}/>
            )
        })
        listCallback(newReports)
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
                    placeholder="Search Reports"
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

export default ReportsSearch;
