import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    DrugCode:{
        type: Number,
        required: true
    },
    ProductName:{
        type: String,
        required: true
    },
    BatchNo:{
        type: Number,
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
    Discount:{
        type: Number,
        required: true
    },
    MfgDate:{
        type: Date,
        required: false
    },
    Expire:{
        type: Date,
        required: false
    },
    Pack:{
        type: String,
        required: true
    },
    MRP:{
        type: Number,
        required: true
    },
    Tax:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

export default mongoose.model('User', userSchema);