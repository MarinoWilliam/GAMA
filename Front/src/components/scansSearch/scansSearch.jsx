import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from '../DoctorSearch/Filter';
import AnalysisListItem from '../analysisListItem/analysisListItem';




const ScansSearch = ({ listCallback, flagCallback, patId, type }) => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
            try {
                fetch(`http://localhost:8000/myScans/${patId}`, { credentials: 'include' })
                    .then((response) => response.json())
                    .then((analysis) => {
                        let temList = []
                        analysis.forEach((analys) => {
                            temList.push({ id: analys._id, name: analys.title, photo: analys.images.url, date: analys.date, doctorName: analys.doctorName });
                        });
                        setList(temList)
                    });
            } catch (err) {
                console.log(err);
            }
    }, [patId, type])


    const handleChange = async e => {
        setSearchValue(e.target.value);
        let finalList = searchFilter(e.target.value, list)
        if (finalList.length > 0) {

        }
        console.log(`finalList : ${finalList}`)

        let newAnalysis = finalList.map((analys) => {
            return (
                <AnalysisListItem title={analys.name} analysisId={analys.id} date={analys.date} photo={analys.photo} doctorName={analys.doctorName} />
            )
        })
        listCallback(newAnalysis)
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
                    placeholder="Search Scans"
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

export default ScansSearch;
