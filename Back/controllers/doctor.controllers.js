const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocoding({ accessToken: mapboxToken });
const ExpressError = require('../utils/ExpressError');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient")


const showDoctorData = async (req, res, next) => {
    const { id } = req.params;
    const finalDoctor = await Doctor.findById(id).populate([{ path: 'patientsList.patient' }, { path: 'patientsPending' }, {path:'reviews'}]);

    res.send(finalDoctor);

}

const loginDoctor = async (req, res) => {
    req.flash('success', 'Welcome Back');
    try {
        console.log(req.user._id)
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

const signupDoctor = async (req, res, next) => {
    try {
        const { firstName, lastName, password, birthdate, country, city, town, email, gender, speciality,clinicLocation } = req.body
        //res.send(req.body)
        const location = `${town}, ${city}, ${country},`
        const doctor = new Doctor({ firstName, lastName, email })
        doctor.birthdate = birthdate;
        doctor.rating=0
        doctor.gender = gender;
        doctor.location = location;
        doctor.clinicLocation = clinicLocation;
        const toQuery=`Africa, Egypt, ${clinicLocation}, Egypt`
        doctor.speciality = speciality;
        const geoData = await geoCoder.forwardGeocode({
            query: clinicLocation,
            limit: 1
        }).send()
        doctor.geometry = geoData.body.features[0].geometry
        doctor.profilePicture = {
            url: 'https://res.cloudinary.com/dqwwqax3d/image/upload/v1675941301/generic_profile.jpg',
            filename: 'generic_profile'
        }
        doctor.username = doctor.email;
        const registerdDoctor = await Doctor.register(doctor, password)
        await doctor.save();
        req.login(registerdDoctor, err => {
            if (err) {
                return next(err);
            } else {
                req.flash('success', 'Welcome to GAMA');
                res.send(doctor)
            }
        })

    } catch (e) {
        req.flash('error', e.message);
        res.send(e.message)
    }
}

const logoutDoctor = async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('warning', "You are loged out")
        res.send('loged out')
    });
}

const sendReqToPatient = async (req, res) => {
    const { serial } = req.body;
    const doctor_id = req.user._id
    const patient = await Patient.findOne({ serial: serial });
    const doctor = await Doctor.findById(doctor_id);
    if (patient.doctorsRequestList.includes(doctor._id) || patient.doctorsList.includes(doctor._id)) {
        console.log(`already exist`)
        const finalDoctor = await doctor.populate([{ path: 'patientsPending' }, { path: 'patientsList.patient' }]);
        console.log(finalDoctor)
        res.send(finalDoctor)
    } else {
        console.log(`new`)
        patient.doctorsRequestList.push(doctor._id);
        await patient.save()
        doctor.patientsPending.push(patient._id)
        await doctor.save()
        const finalDoctor = await doctor.populate([{ path: 'patientsPending' }, { path: 'patientsList.patient' }]);
        // finalDoctor.patientsPending.map(( patient) => { console.log(patient) });
        console.log(finalDoctor)
        res.send(finalDoctor)
    }
}

const getAllDocs = async (req, res) => {
    const doctors = await Doctor.find({});
    res.send(doctors);
}

const getMyDocs = async (req, res) => {
    if (req.user) {
        const patientId = req.user._id
        const patient = await Patient.findById(patientId)
        let doctors = []
        if (patient) {
            doctors = await Doctor.find({
                '_id': { $in: patient.doctorsList }
            });
        }
        res.send(doctors);
    } else {
        res.send('not loged in');

    }
}

const getDocsForSpec = async (req, res) => {
        const {spec,docId} = req.params
        const doctors = await Doctor.find({speciality:spec})
        if (doctors.length>0) {
            notFinalDoctors = doctors.map((doc) => {
                return (
                    {
                        photo:doc.profilePicture.url,
                        doctorName:doc.fullName,
                        rating:doc.rating,
                        location:doc.location,
                        id:doc._id
                    }
                    )
            })
            finalDoctors=notFinalDoctors.filter((doc)=>{
                return doc.id.toString() !== docId.toString()
            })
        }else{
            finalDoctors=false
        }
        res.send(finalDoctors)
    }

const changePhoto = async (req, res) => {
    const { image } = req.body;
    const doctorId = req.user._id
    if (image) {
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {
            profilePicture: {
                url: image,
                filename: 'profile_photo'
            }
        })
        await doctor.save()
        console.log('profile changed')
    }
    res.send('done')
}

module.exports = {
    loginDoctor,
    signupDoctor,
    logoutDoctor,
    sendReqToPatient,
    showDoctorData,
    getAllDocs,
    getMyDocs,
    getDocsForSpec,
    changePhoto
}
