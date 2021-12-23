const mongoose = require('mongoose')

// Step2 :Define the schema
// defining the schema
const Schema = mongoose.Schema
const PropertySchema = new Schema({
    title: String,
    userid: String,

    name: String,
    phoneno: Number,
    area: String,
    bhk: String,
    waterType: String,
    rent: Number,
    deposit: Number,
    parking: String,
    location: String,
    vastu: String,
    maintenanceCharges: Number,
    notes: String,

})

// Step3 Define the model
// Modules
const Property = mongoose.model('Property', PropertySchema)

module.exports = Property