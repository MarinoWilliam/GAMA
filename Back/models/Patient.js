const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { cloudinary } = require('../cloudinary');
const passportLocalMongoose = require('passport-local-mongoose');

const options = { toJSON: { virtuals: true } }

const ImageSchema = new Schema({
    url: String,
    filename: String,
}, options);

ImageSchema.virtual('medium').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

ImageSchema.virtual('small').get(function () {
    return this.url.replace('/upload', '/upload/w_90');
})


const PatientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: String,
    guardianNumber: Number,
    serial: {
        type: Number,
        required: false,
        unique: true
    },
    watchSerial: {
        type: Number,
        required: false,
        unique: true
    },
    watchPin: {
        type: Number,
        required: false,
        unique: true
    },
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
    bodyBasicInfo: {
        bloodType: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O'],
            default: 'A+'
        }
        ,

        height: {
            type: Number,
            default: 0
        }
        ,

        weight: {
            type: Number,
            default: 0
        }
        ,

        muscle_mass: {
            type: Number,
            default: 0
        }
        ,

        lean_body_mass: {
            type: Number,
            default: 0
        }
        ,

        body_fat_percentage: {
            type: Number,
            default: 0
        }
        ,

        body_water: {
            type: Number,
            default: 0
        }
        ,

        visceral_fat_level: {
            type: Number,
            default: 0
        }
        ,

        body_mass_index: {
            type: Number,
            default: 0
        }
        ,

        basal_metabolic_rate: {
            type: Number,
            default: 0
        }
    },
    chronics: [ String ],
    alergies: [ String ],
    reports: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Report'
        }
    ],
    drugs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Drug'
        }
    ],
    operations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Operation'
        }
    ],
    analysis: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Analysis'
        }
    ],
    doctorsList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
    doctorsRequestList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
    emergencyContactName: {
        type: String,
    },
    emergencyContactNumber: {
        type: Number,
    },
}, options)



PatientSchema.virtual('fullName').get(function () {
    return (`${this.firstName} ${this.lastName}`)
})

PatientSchema.virtual('age').get(function () {
    var today = new Date();
    var bDate = new Date(this.birthdate);
    var age = today.getFullYear() - bDate.getFullYear();
    var m = today.getMonth() - bDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
        age--;
    }
    return age
})

PatientSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Patient', PatientSchema);
