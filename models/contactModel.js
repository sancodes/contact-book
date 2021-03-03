const mongoose = require('mongoose');
const Schema = mongoose.Schema();

/*
 * Address Schema --> nested inside the Contact Schema
 */
const addressSchema = new Schema({
    street: { type: String, trim: true },
    state: { type: String, trim: true }, 
    zip: {type: Number, match:[/^[0-9]{5}([-][0-9]{3})?$/, 'Please Enter Valid Zip Code']}
});

/*
 * Contact Schema
 */
const contactSchema = new Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, required: true, min: 1, trim: true},
    phoneNumber: { type: String, trim:true, match: [/^\d{3}-\d{3}-\d{4}$/, 'Please Enter Valid Phone Number.'] },
    email: { type: String, trim: true, match: [/^(\w{1,})([\.+-]?\w+)?\@[a-z]{1,}([.-]?\w+){1,}?\.[a-z]{2,6}$/, 'Please Enter Valid Email Address.'] },
    address: [addressSchema] //nested instead of a reference
});

/*
 * exporting contact collection
 */
module.exports = mongoose.model('contact', contactSchema);