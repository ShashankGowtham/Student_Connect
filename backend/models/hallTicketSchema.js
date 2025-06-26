const mongoose = require("mongoose");

const hallTicketSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("HallTicket", hallTicketSchema); 