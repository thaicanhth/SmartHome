import mongoose from "mongoose";

const historySchema = mongoose.Schema({
    hcategory: {
        type: String,
        required: true
    },
    hname: {
        type: String,
        required: true
    },
    hstatus: {
        type: Boolean,
        required: true
    },
    hnotification: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const History = mongoose.model('History', historySchema)