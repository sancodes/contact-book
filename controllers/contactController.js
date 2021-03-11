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
        //apparently only pushes the contactSchema field leaves addressSchema field empty
        let newContact = new ContactModel(req.body);
        console.log('before address: ' + newContact);
        //since addressSchema field is empty, I had to push the address field again
        newContact.address.push(req.body);
        console.log('after address: ' + newContact);

        await newContact.save();
        res.redirect('/contacts');
    } catch (err) {
        console.log(err);
    }
};

//GET  --> specific person's detail
module.exports.getPersonDetails = async (req, res, next) => {
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
module.exports.deletePerson = async (req, res, next) => {
    try {
        await ContactModel.findByIdAndDelete(req.params.id).exec();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}
//UPDATE --> person 

//GET --> add another address
module.exports.getAdditionalAddressForm = async (req, res, next) => {
    try {
        let personID = await ContactModel.findById(req.params.id);

        res.render('addAddress', {
            title: 'Add Additional Address',
            id: personID._id
        })
    } catch (err) {
        console.log(err);
    }
}

//POST --> add another address
module.exports.addAdditionalAddress = async (req, res, next) => {
    try {
        let personDetails = await ContactModel.findById(req.params.id);

        personDetails.address.push(req.body); //pushing it to the new address personDetails

        await personDetails.save(); //since the personDetails has push the new address, need to save it to the db 
        res.redirect(`/contacts/person/${personDetails._id}`);

    } catch (err) {
        console.log(err);
    }
}
