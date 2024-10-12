const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema ({
    reviewPara : String,
    date : String,
    rating:Number,
    doctor :
        {
            type : Schema.Types.ObjectId,
            ref : 'Doctor'
        },
    patient :
        {
            type : Schema.Types.ObjectId,
            ref : 'Patient'
        },
    doctorName:String
})




module.exports= mongoose.model('Review',ReviewSchema);
