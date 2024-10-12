import React from 'react'
import DrugForm from '../../components/drugForm/drugForm';
import './addDrugForm.css'


const addDrug = () => {
    return (
        <div className='MedicineContainer'>
            <div className='MediDev'>
                <DrugForm />

            </div>
        </div>
    )
}

export default addDrug