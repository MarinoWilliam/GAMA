
const ExpressError = require('../utils/ExpressError');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient")
const Operation = require("../models/Operation")



const addOperation = async (req, res) => {
    try {
        const doctorId = req.user._id
        const { patientId } = req.params;
        const patient = await Patient.findById(patientId)
        const doctor = await Doctor.findById(doctorId)

        const { type, procedure, date, notes } = req.body
        const operation = new Operation({ type, procedure, date, notes })
        operation.doctor = doctor;
        operation.doctorName = doctor.fullName;

        const finalOperation = await operation.save();
        patient.operations.push(finalOperation);
        await patient.save()

        res.send(doctor)

    } catch (e) {
        console.log(e)
        res.send(e.message)
    }
}

const findOpForDoc = async (req, res) => {
    const { docId } = req.params;
    const operations = await Operation.find({ doctor: docId });
    res.send(operations)
}

const getMyOperations = async (req, res) => {
    const { patId } = req.params;
    const finalPatient = await Patient.findById(patId).populate([{ path: 'operations' }]);
    
    // const DocsNames= await Promise.all( finalPatient.reports.map((r)=>{ getDocOfReport(r)}));
    const finalArr=[...finalPatient.operations]
    res.send(finalArr);
}


module.exports = {
    addOperation,
    findOpForDoc,
    getMyOperations
}