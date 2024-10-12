
const ExpressError = require('../utils/ExpressError');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient")
const Drug = require("../models/Drug")



const addDrug = async (req, res) => {
    try {
        const doctorId = req.user._id
        const { patientId } = req.params;
        const patient = await Patient.findById(patientId)
        const doctor = await Doctor.findById(doctorId)

        const { drugName, cause, doseFactor, notes } = req.body.form
        const  dose  = req.body.dose
        console.log(`dose`)
        console.log(dose)

        const drug = new Drug({ drugName, cause,dose, doseFactor, notes })
        drug.doctor = doctor;
        drug.date=new Date()
        drug.doctorName=doctor.fullName
        const finalDrug = await drug.save();
        patient.drugs.push(finalDrug);
        await patient.save()

        res.send(doctor)

    } catch (e) {
        console.log(e)
        res.send(e.message)
    }
}


const getMyDrugs = async (req, res) => {
    const { patId } = req.params;
    const finalPatient = await Patient.findById(patId).populate([{ path: 'drugs' }]);
    
    // const DocsNames= await Promise.all( finalPatient.reports.map((r)=>{ getDocOfReport(r)}));
    const finalArr=[...finalPatient.drugs]
    res.send(finalArr);
    }

module.exports = {
    addDrug,
    getMyDrugs,
}