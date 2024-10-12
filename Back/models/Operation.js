const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OperationSchema = new Schema ({
    type : String,
    procedure : String,
    date : String,
    notes : String,
    doctor :
        {
            type : Schema.Types.ObjectId,
            ref : 'Doctor'
        },
    doctorName:String
})



module.exports= mongoose.model('Operation',OperationSchema);
