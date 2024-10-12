const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema ({
    url:String,
    filename:String,
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
})

const ReportSchema = new Schema ({
    title : String,
    images : ImageSchema,
    date : String,
    notes : String,
    allergies: String,
    chronic: String,
    medicalField:String,
    doctor :
        {
            type : Schema.Types.ObjectId,
            ref : 'Doctor'
        },
    doctorName:String
})




module.exports= mongoose.model('Report',ReportSchema);
