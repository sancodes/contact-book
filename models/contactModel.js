const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Address Schema --> nested inside the Contact Schema
 */
const addressSchema = new Schema({
    street: { type: String, trim: true },
    state: { type: String, trim: true , match: [/^[a-zA-Z]{2,}/, 'Please Enter State in a Correct Format']}, 
    zip: {type: Number, match:[/^[0-9]{5}([-][0-9]{3})?$/, 'Please Enter Valid Zip Code']}
});

/*
 * Contact Schema
 */
const contactSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, required: true, min: 1, trim: true },
    phoneNumber: { type: String, trim: true, match: [/^\d{3}-\d{3}-\d{4}$/, 'Please Enter Valid Phone Number.'], required: true },
    email: { type: String, trim: true, match: [/^(\w{1,})([\.+-]?\w+)?\@[a-z]{1,}([.-]?\w+){1,}?\.[a-z]{2,6}$/, 'Please Enter Valid Email Address.'] },
    address: [addressSchema] //nested instead of a reference
},
    { timestamps: true }
);

/*
 * exporting Contact collection
 * in db it will show as contacts   --> db will make everything small letter, and add 's' to the collection name
 */
module.exports = mongoose.model('Contact', contactSchema);