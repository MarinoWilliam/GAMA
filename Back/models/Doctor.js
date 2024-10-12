// const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { cloudinary } = require('../cloudinary');
const Report = require("./Report")
const passportLocalMongoose = require('passport-local-mongoose');


const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual('medium').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

ImageSchema.virtual('small').get(function () {
    return this.url.replace('/upload', '/upload/w_90');
})

const options = { toJSON: { virtuals: true } }

const DoctorSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: String,
    profilePicture: ImageSchema,
    location: String,
    birthdate: {
        type: [String],
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female']
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    patientsList: [
        {
            patient:
            {
                type: Schema.Types.ObjectId,
                ref: 'Patient'
            },
            state:{
                type:String
            }
    }
    ],
    patientsPending: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    rating:Number,
    speciality: String,
    clinicLocation: String,
}, options)


DoctorSchema.virtual('fullName').get(function () {
    return (`${this.firstName} ${this.lastName}`)
})

DoctorSchema.virtual('age').get(function () {
    var today = new Date();
    var bDate = new Date(this.birthdate);
    var age = today.getFullYear() - bDate.getFullYear();
    var m = today.getMonth() - bDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
        age--;
    }
    return age
})


DoctorSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


module.exports = mongoose.model('Doctor', DoctorSchema);
