const mongoose=require("mongoose");

const challanSchema = mongoose.Schema({
    vehicle_number: {
        type: String,
        required: true
    },
    violation: {
        type: String,
        required: true
    },
    fine: {
        type: Number,
        required: true
    },
    imageID: {
        type: String,
        required: true // Set to true if the image is mandatory
    }
}, { timestamps: true });

module.exports = mongoose.model('Challan', challanSchema);
