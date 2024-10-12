
const ExpressError = require('../utils/ExpressError');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient")
const Report = require("../models/Report")



const addReport = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const { patientId } = req.params;
        const patient = await Patient.findById(patientId)
        const doctor = await Doctor.findById(doctorId)

        const { title, allergies, chronic, notes } = req.body.form
        console.log(title)
        const  image  = req.body.report
        const report = new Report({ title, allergies, chronic, notes })
        report.images = {
            url: image,
            filename: 'report_image'
        }
        report.medicalField=doctor.speciality;
        report.doctor = doctor;
        report.doctorName=doctor.fullName
        report.date=new Date()
        const finalReport = await report.save();
        
        patient.reports.push(finalReport);
        // if (!patient.allergies.includes(allergies)){
        //     await patient.allergies.push(allergies)
        // }
        // if (!patient.chronics.includes(chronic)){
        //     await patient.chronics.push(chronic)
        // }
        await patient.save()
        res.send(doctor)

    } catch (e) {
        console.log(e)
        res.send(e.message)
    }
}

const getReportChronic = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await Report.findById(reportId);
        res.send({chronic:report.chronic});

    } catch (e) {
        console.log(e)
        res.send(e.message)
    }
}


const getPastWeekReports = async (req, res) => {
    
    const doctor_id = req.user._id
    const today = new Date();
    var reportsWeek=[]

    var wanteddays = 6;
    while(wanteddays>=0){
        const reports = await Report.find({ 
            date: {
                $gt: new Date(today-((wanteddays+1)*24*3600*1000)), 
                $lt: new Date(today-(wanteddays*24*3600*1000))
            },
            doctor:doctor_id,
        })
        wanteddays = wanteddays -1;
        reportsWeek.push(reports.length)
    }
    console.log(`reports week ${reportsWeek}`)
    res.send(reportsWeek)
}


const getMyReports = async (req, res) => {
const { patId } = req.params;
const finalPatient = await Patient.findById(patId).populate([{ path: 'reports' }]);

const finalArr=[...finalPatient.reports]
res.send(finalArr);
}

const getReport = async (req, res) => {
    const { reportId } = req.params;
    const finalReport = await Report.findById(reportId).populate([{ path: 'images' }]);
    res.send(finalReport);
    }

module.exports = {
    addReport,
    getReportChronic,
    getPastWeekReports,
    getMyReports,
    getReport
}