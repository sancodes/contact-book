let ContactModel = require('../models/contactModel');

//GET --> contacts --> homepage
module.exports.getAllContacts = async (req, res, next) => {
    let contactList = await ContactModel.find({});
   
    res.render('index', {
        title: 'Contacts Home Page',
        contact: contactList
    });
};


//GET --> new contact form

//POST --> save contact in the database

//GET  --> specific person's detail

//DELETE  --> person contact from db

//UPDATE --> person 
