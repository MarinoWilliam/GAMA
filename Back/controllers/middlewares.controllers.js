const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const ExpressError = require('../utils/ExpressError');



const isLoggedIn = async (req, res) => {
    const user = req.user
    if (user) {
        console.log('trueeeeeeee')
        const theId = req.user._id
        const doctor = await Doctor.findById(theId);
        const patient = await Patient.findById(theId);
        if(doctor){
        console.log('doctor')
        res.send({  type:'doctor',
                    id:doctor._id})
        }else{
        console.log('patient')
        res.send({  type:'patient',
        id:patient._id})
        }
    } else {
        console.log('falssssssssse')
        res.send(false)
    }
}


const logOut = async (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.send('done');
    });
    console.log('loggggeeeed out')

}


const isUser = async (req, res, next) => {
    if (req.user) {
        next();
    }else{
    const str = `notUser`
    return res.send({ str })
    }
}

const isThePatient = async (req, res, next) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient || (!patient._id.equals(req.user._id))) {
        const str = `notAuthorized`
        return res.send({ str })
    }else{
    next();
    }
}

const isTheDoctor = async (req, res, next) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor || (!doctor._id.equals(req.user._id))) {
        const str = `notAuthorized`
        return res.send({ str })
    }else{
    next();
    }
}




module.exports = {
    isLoggedIn,
    logOut,
    isThePatient,
    isTheDoctor,
    isUser
}