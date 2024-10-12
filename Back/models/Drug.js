const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrugSchema = new Schema ({
    drugName : String,
    cause : String,
    dose : Number,
    doseFactor : String,
    durationFactor : String,
    notes : String,
    date : String,
    doctor :
        {
            type : Schema.Types.ObjectId,
            ref : 'Doctor'
        },
    doctorName:String
    
})




module.exports= mongoose.model('Drug',DrugSchema);
