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
        // since was getting [Object: null prototype] { .... } --> fix was JSON.parse(JSON.stringify(req.body))
        let formInputs = JSON.parse(JSON.stringify(req.body));

        //apparently only pushes the contactSchema field leaves addressSchema field empty
        let newContact = new ContactModel();

        newContact.firstName = formInputs.firstName;
        newContact.lastName = formInputs.lastName;
        newContact.phoneNumber = formInputs.phoneNumber;

        if (formInputs.email) {
            newContact.email = formInputs.email;
        }

        if (formInputs.street || formInputs.state || formInputs.zip) {
            newContact.address.push({street:formInputs.street, state: formInputs.state, zip: formInputs.zip })
        }
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
        console.log("Personal Details" + personDetails);
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

//GET --> personDetails Update Form
module.exports.getUpdateContactDetails = async(req, res, next) => {
    try {
        let personDetails = await ContactModel.findById(req.params.id);
        res.render('updateDetail', {
            title: 'Update Detail',
            personInfo: personDetails
        });
    } catch (err) {
        console.log(err);
    }
}

//PUT --> 
module.exports.updateContactDetails = async (req, res, next) => {
    try {
        console.log('inside the controller!');
        console.log(req.body);  //i need to catch the data and compare it with my stored data and change it
        let actualPerson = await ContactModel.findById(req.body._id);
        // console.log(actualPerson);

        //maybe boolean to keep track if there was any changes or not? 
        //maybe i can even add counter to see how many items were changed;
        // await actualPerson.save();
        if (!(req.body === undefined)) {
            if (req.body.firstName !== actualPerson.firstName) {
                actualPerson.firstName = req.body.firstName;
            }
            if (req.body.lastName !== actualPerson.lastName) {
                actualPerson.lastName = req.body.lastName;
            }
            if (req.body.phoneNumber !== actualPerson.phoneNumber) {
                actualPerson.phoneNumber = req.body.phoneNumber;
            }
            //if the email exists in the actual db then we can worry about changing, if not it wont even show in the update form field
            if (actualPerson.email) {
                if (req.body.email !== actualPerson.email) {
                    actualPerson.email = req.body.email;
                }
            }
            //if the address exists in the actual db then we can worry about changing, if not it wont even show in the update form field
            //so the update form passes in a list of street, state and zip, not like a object/dictionary
            if (!(actualPerson.address === undefined)) {
                for (let i = 0; i < actualPerson.address.length; i++) {
                    if (actualPerson.address[i].street !== req.body.street[i]) {
                        actualPerson.address[i].street = req.body.street[i];  //now the part that is not working is if there's only one address, then the req.body.street[i] will only take the first lettter. since the req.body.street at that point will not have the address as an list so that's why.
                    }
                    if (actualPerson.address[i].state !== req.body.state[i]) {
                        console.log(req.body.state[i]);
                        actualPerson.address[i].state = req.body.state[i];
                    }
                    //gotta make sure they actually enter correct format zipcode
                    if (actualPerson.address[i].zip !== req.body.zip[i]) {
                        actualPerson.address[i].zip = req.body.zip[i];
                    }
                }
            };
        }
        await actualPerson.save();
        res.redirect(`/contacts/person/${actualPerson._id}`);
    } catch (err) {
        console.log(err);
    }
}