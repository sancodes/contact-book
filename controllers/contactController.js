let ContactModel = require('../models/contactModel');

//GET --> contacts --> homepage
module.exports.getAllContacts = async (req, res, next) => {
    let contactList = await ContactModel.find({});
   
    res.render('home', {
        title: 'Contacts Home Page',
        contacts: contactList
    });
};


//GET --> new contact form
module.exports.addNewContactForm = (req, res, next) => {
    res.render('new', {
      title: 'Add Contact'
  })  
};

//POST --> save contact in the database
module.exports.addNewContact = async (req, res, next) => {
    try {
        let newContact = new ContactModel(req.body);
        await newContact.save();
        res.redirect('/contacts');
    } catch (err) {
        console.log(err);
    }
};

//GET  --> specific person's detail
module.exports.getPersonDetails = async(req, res, next) => {
    try {
        let personDetails = await ContactModel.findById(req.params.id);
        res.render('person', {
            title: 'Detail Page',
            personInfo: personDetails
        });
    } catch (err) {
        console.log(err);
    }
};
//DELETE  --> person contact from db

//UPDATE --> person 
