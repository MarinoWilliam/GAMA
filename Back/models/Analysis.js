const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const AnalysisSchema = new Schema({
    title: String,
    images: ImageSchema,
    date: String,
    type: String,
    notes: String,
    doctor:
    {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    doctorName: String,
    LabTitle:String
})




module.exports = mongoose.model('Analysis', AnalysisSchema);
