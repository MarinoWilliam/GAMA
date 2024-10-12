import React from 'react'
import OperationForm from '../../components/operationForm/operationForm';
import './addOperationForm.css'


const addOperation = () => {
    return (
        <div className='OperationContainer'>
            <div className='MediDev'>
                <OperationForm />

            </div>
        </div>
    )
}

export default addOperation