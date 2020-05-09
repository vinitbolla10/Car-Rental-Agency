const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    vehicle_number: {
        type: Number,
        unique: 'vehicle number already exist',
        required: 'vehicle number is required',
        trim: true
    },
    model: {
        type: String,
        required: 'Model name required',
        trim: true
    },
    seating_capacity: {
        type: Number,
        required: 'seating capacity is required',
        trim: true
    },
    rent_per_day: {
        type: Number,
        required: 'Rent per day is required',
        trim: true
    },
    booked_by: [{ type: mongoose.Schema.ObjectId, ref: "Customers", },],
    issue_date: {
        type: Date
    },
    return_date: {
        type: Date
    }
});

module.exports = mongoose.model("Cars", CarSchema);