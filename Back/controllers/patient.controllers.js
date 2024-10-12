//const {patientJoiSchema}=require('../models/JoiModels');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocoding({ accessToken: mapboxToken });
const ExpressError = require('../utils/ExpressError');
const nanoid = require('nanoid');
const customAlphabet = require('nanoid');
const idGenerator = nanoid.customAlphabet('1234567890')
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");


const loginPatient = async (req, res) => {
    req.flash('success', 'Welcome Back');
    try {
        res.send({ "id": req.user._id, 'loginFailed': 'false' })
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
        res.send({ "failure": "true" })
    }
}

const signupPatient = async (req, res, next) => {
    try {
        const { firstName, lastName, password, birthdate, country, city, town, email, gender, guardianNumber } = req.body
        //res.send(req.body)
        const location = `${town}, ${city}, ${country}`
        const patient = new Patient({ firstName, lastName, email })
        patient.guardianNumber = guardianNumber;
        patient.birthdate = birthdate;
        patient.gender = gender;
        patient.location = location;
        patient.serial = idGenerator(6);
        patient.watchSerial = idGenerator(12);
        patient.watchPin = idGenerator(4);
        const geoData = await geoCoder.forwardGeocode({
            query: location,
            limit: 1
        }).send()
        patient.geometry = geoData.body.features[0].geometry
        patient.profilePicture = {
            url: 'https://res.cloudinary.com/dqwwqax3d/image/upload/v1675941301/generic_profile.jpg',
            filename: 'generic_profile'
        }
        patient.username = patient.email;
        const registerdPatient = await Patient.register(patient, password)
        await patient.save();
        req.login(registerdPatient, err => {
            if (err) {
                return next(err);
            } else {
                req.flash('success', 'Welcome to GAMA');
                res.send(patient)
            }
        })

    } catch (e) {
        req.flash('error', e.message);
        res.send(e.message)
    }
}


const logoutPatient = async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('warning', "You are loged out")
        res.send('loged out')
    });
}

async function editBasicPatient(req, res) {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, { ...req.body }, { new: true });
    res.send("Update Done")
    console.log("Patient data updated successfully")
}

const CheckingLogin = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', "You must be signed in");
        //return res.redirect('/login');
        next();
    }
    return next();
}



const isThePatient = async (req, res, next) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient._id.equals(req.user._id)) {
        req.flash('error', "You do not have the permession to do that");
        //return res.redirect(`/patient/${patient._id}`)
        next();
    }
    next();
}

const showPatientData = async (req, res, next) => {
    const { id } = req.params;
    const finalPatient = await Patient.findById(id).populate([{ path: 'doctorsList' }, { path: 'doctorsRequestList' }, { path: 'reports' }]);
    res.send(finalPatient);
}

const tempAddDoctors = async (req, res, next) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    const doctors = await Doctor.find({})
    doctors.map(doctor => { patient.doctorsList.push(doctor) })
    doctors.map(doctor => { patient.doctorsRequestList.push(doctor) })
    await patient.save()
    const finalPatient = await Patient.findById(id).populate('doctorsList').populate('doctorsRequestList');
    res.send(finalPatient);
}

const showAllPatients = async (req, res, next) => {
    const patients = await Patient.find({});
    const doctors = await Doctor.find({})
    doctors.map(doctor => { patient.doctorsList.push(doctor) })
    doctors.map(doctor => { patient.doctorsRequestList.push(doctor) })
    await patient.save()
    const finalPatient = await Patient.findById(id).populate([{ path: 'doctorsList' }, { path: 'doctorsRequestList' }]);
    res.send(finalPatient);
}

const findPatientBySerial = async (req, res) => {
    const { patientSerial } = req.body;
    const patient = await Patient.findOne({ serial: patientSerial }).populate([{ path: 'doctorsList' }, { path: 'doctorsRequestList' }]);
    res.send(patient)
}
const changePhoto = async (req, res) => {
    const { image } = req.body;
    const patientId = req.user._id
    if (image) {
        const patient = await Patient.findByIdAndUpdate(patientId, {
            profilePicture: {
                url: image,
                filename: 'profile_photo'
            }
        })
        await patient.save()
        console.log('profile changed')
    }
    res.send('done')
}

const acceptDoctor = async (req, res) => {
    const patientId = req.user._id
    const { doctorId } = req.params;
    const patient = await Patient.findById(patientId)//.populate([{path: 'doctorsRequestList'}, {path: 'doctorsList'}]);
    const doctor = await Doctor.findById(doctorId)//.populate([{path: 'patientsPending'}, {path: 'patientsList'}]);
    const DocIndex = patient.doctorsRequestList.indexOf(doctor._id);
    console.log(`doc index ${DocIndex}`)
    if (DocIndex > -1) {
        patient.doctorsRequestList.splice(DocIndex, 1);
        patient.doctorsList.push(doctor);
        await patient.save()

    }
    const PatIndex = doctor.patientsPending.indexOf(patient._id);
    console.log(`pat index ${PatIndex}`)
    if (PatIndex > -1) {
        doctor.patientsPending.splice(PatIndex, 1);
        const finalPatient = {
            patient: patient,
            state: 'current'
        }
        doctor.patientsList.push(finalPatient)
        await doctor.save()
    }
    res.send(patient)
}

const rejectDoctor = async (req, res) => {
    const patientId = req.user._id
    const { doctorId } = req.params;
    const patient = await Patient.findById(patientId)//.populate([{path: 'doctorsRequestList'}, {path: 'doctorsList'}]);
    const doctor = await Doctor.findById(doctorId)//.populate([{path: 'patientsPending'}, {path: 'patientsList'}]);
    const DocIndex = patient.doctorsRequestList.indexOf(doctor._id);
    console.log(`doc index ${DocIndex}`)
    if (DocIndex > -1) {
        patient.doctorsRequestList.splice(DocIndex, 1);
        await patient.save()

    }
    const PatIndex = doctor.patientsPending.indexOf(patient._id);
    console.log(`pat index ${PatIndex}`)
    if (PatIndex > -1) {
        doctor.patientsPending.splice(PatIndex, 1);
        await doctor.save()
    }
    res.send(patient)
}
const removeDoctor = async (req, res) => {
    const patientId = req.user._id
    const { doctorId } = req.params;
    const patient = await Patient.findById(patientId)//.populate([{path: 'doctorsRequestList'}, {path: 'doctorsList'}]);
    const doctor = await Doctor.findById(doctorId)//.populate([{path: 'patientsPending'}, {path: 'patientsList'}]);
    const DocIndex = patient.doctorsList.indexOf(doctor._id);
    console.log(`doc index ${DocIndex}`)
    if (DocIndex > -1) {
        patient.doctorsList.splice(DocIndex, 1);
        await patient.save()

    }
    var PatIndex = -1;
    const patArr = [doctor.patientsList.map(p => (p.patient))]
    for (let i in patArr) {
        if (patArr[i] == patientId) {
            PatIndex = i;
            break
        }
    }

    if (PatIndex > -1) {
        doctor.patientsList.splice(PatIndex, 1);
        await doctor.save()
    }
    res.send(patient)
}



const getAllPats = async (req, res) => {
    const patient = await Patient.find({});
    res.send(patient);
}


const getMyReports = async (p) => {
    const finalPat = await p.populate([{ path: 'reports' }])
    return finalPat;
}

const getMyPats = async (req, res) => {
    if (req.user) {
    const doctorId = req.user._id
    const doctor = await Doctor.findById(doctorId).populate([{ path: 'patientsList.patient' }, { path: 'patientsPending' }]);
    // console.log(`the doc is:${doctor}`);

    var patIdList = []

    if (doctor) {
        patIdList = await Promise.all(doctor.patientsList.map((P) => getMyReports(P.patient)))
    }


    res.send(patIdList);
    }else{
    res.send('not loged in');
    }
}

module.exports = {
    loginPatient,
    signupPatient,
    logoutPatient,
    editBasicPatient,
    showPatientData,
    tempAddDoctors,
    findPatientBySerial,
    acceptDoctor,
    rejectDoctor,
    removeDoctor,
    changePhoto,
    getAllPats,
    getMyPats
}
