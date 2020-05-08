const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    Vehicle_number: {
        type: Number,
        unique: 'vehicle number already exist',
        required: 'vehicle number is required',
        trim: true
    },
    Model: {
        type: String,
        required: 'Model name required',
        trim: true
    },
    Seating_capacity: {
        type: Number,
        required: 'seating capacity is required',
        trim: true
    },
    Rent_per_day: {
        type: Number,
        required: 'Rent per day is required',
        trim: true
    },
    Booked_by: [{ type: mongoose.Schema.ObjectId, ref: "Customers", },],
    Issue_date: {
        type: Date
    },
    Return_date: {
        type: Date
    }
});

module.exports = mongoose.model("Cars", CarSchema);