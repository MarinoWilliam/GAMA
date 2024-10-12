
const ExpressError = require('../utils/ExpressError');
const moment = require('moment-timezone');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient")
const Analysis = require("../models/Analysis")



const addAnalysis = async (req, res) => {
    try {
        const doctorId = req.user._id
        const { patientId } = req.params;
        const patient = await Patient.findById(patientId)
        const doctor = await Doctor.findById(doctorId)

        const { title, date, type, notes,LabTitle } = req.body.form
        const image = req.body.analysis
        const analysis = new Analysis({ title, type, notes ,LabTitle })
        analysis.date = new Date(date).toUTCString()
        analysis.images = {
            url: image,
            filename: 'analysis_image'
        }
        analysis.doctor = doctor;
        analysis.doctorName=doctor.fullName
        const finalAnalysis = await analysis.save();

        patient.analysis.push(finalAnalysis);

        await patient.save()
        res.send(doctor)

    } catch (e) {
        console.log(e)
        res.send(e.message)
    }
}


const getPastWeek = async (req, res) => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];
    var finalWeek = []
    var wanteddays = 7;
    var temp = d.getDay()
    while (wanteddays != 0) {
        if (temp < 0)
            temp = 6;
        finalWeek.push(weekday[temp]);
        temp = temp - 1;
        wanteddays = wanteddays - 1;
    }
    res.send(finalWeek.reverse())
}

const getPastWeekAnalysis = async (req, res) => {
    const doctor_id = req.user._id
    const today = moment.utc()
    const startOfWeek = moment.utc().startOf('week')
    const endOfWeek = moment.utc().endOf('week')
    const finalAnalysis = []

    // Loop through each day of the past week
    for (let i = 0; i < 7; i++) {
        const startOfDay = moment.utc(startOfWeek).add(i, 'days')
        const endOfDay = moment.utc(startOfWeek).add(i, 'days').endOf('day')
        const analysis = await Analysis.find({
            date: {
                $gte: startOfDay.toDate(),
                $lte: endOfDay.toDate(),
            },
            doctor: doctor_id,
            type: "analysis"
        })
        finalAnalysis.push(analysis.length)
    console.log(startOfDay.toDate())
    console.log(endOfDay.toDate())
    console.log(analysis)
    }

    console.log(`analysis week ${finalAnalysis}`)
    console.log(`_______________________________________________________________________`)
    res.send(finalAnalysis)
}

const getPastWeekScans = async (req, res) => {
    const doctor_id = req.user._id
    const today = new Date();
    var finalAnalysis = []
    var wanteddays = 6;
    while (wanteddays >= 0) {
        const analysis = await Analysis.find({
            date: {
                $gt: new Date(today-((wanteddays+1)*24*3600*1000)), 
                $lt: new Date(today-(wanteddays*24*3600*1000))
            },
            doctor: doctor_id,
            type: "scan"
        })
        wanteddays = wanteddays - 1;
        finalAnalysis.push(analysis.length)
    }
    console.log(`scan week ${finalAnalysis}`)
    res.send(finalAnalysis)
}

const getmyAnalysis = async (req, res) => {
    const { patId } = req.params;
    const finalPatient = await Patient.findById(patId).populate([{ path: 'analysis' }]);
    
    const notFinalArr = await [...finalPatient.analysis]
    const finalArr = []
    for (var ana of notFinalArr) {
        if (ana.type==='analysis'){
            finalArr.push(ana)
        }
    }
    res.send(finalArr);
    }

    const getmyScans = async (req, res) => {
        const { patId } = req.params;
        const finalPatient = await Patient.findById(patId).populate([{ path: 'analysis' }]);
        
        const notFinalArr = await [...finalPatient.analysis]
        const finalArr = []
        for (var ana of notFinalArr) {
            if (ana.type==='scan'){
                finalArr.push(ana)
            }
        }
        res.send(finalArr);
        }

        
const getAnalysis = async (req, res) => {
    const { analysisId } = req.params;
    const finalAnalysis = await Analysis.findById(analysisId).populate([{ path: 'images' }]);
    res.send(finalAnalysis);
    }
    

module.exports = {
    addAnalysis,
    getPastWeek,
    getPastWeekAnalysis,
    getPastWeekScans,
    getmyAnalysis,
    getmyScans,
    getAnalysis
}