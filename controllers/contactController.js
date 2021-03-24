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

//DELETE --> specific address 
module.exports.deleteSpecificAddress = async(req, res, next) => {
    try {   //need to fix down here...
        let specificAddress = req.params.addressid;
        let personDocument = req.params.id;
        console.log('address' + specificAddress);
        //so far it gets the specific nested array items in the documents. 
        // let specifiedAddressDetails = await ContactModel.find({ "_id": personDocument }, { address: { $elemMatch: { "_id": specificAddress } } });

        //so using monodb instead of mongoose to delete specific nested array subdocuments
        await ContactModel.updateMany({}, { $pull: { address: { "_id": specificAddress } } }, { multi: true }).exec();
        res.redirect(`/contacts/person/${personDocument}`);

    } catch(e) {
        console.log(e);
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
        let formInputs = JSON.parse(JSON.stringify(req.body));
        let actualPerson = await ContactModel.findById(formInputs._id);

        //maybe boolean to keep track if there was any changes or not? 
        //maybe i can even add counter to see how many items were changed;
        // await actualPerson.save();
        if (!(formInputs === undefined)) {
            if (formInputs.firstName !== actualPerson.firstName) {
                actualPerson.firstName = formInputs.firstName;
            }
            if (formInputs.lastName !== actualPerson.lastName) {
                actualPerson.lastName = formInputs.lastName;
            }
            if (formInputs.phoneNumber !== actualPerson.phoneNumber) {
                actualPerson.phoneNumber = formInputs.phoneNumber;
            }
            //if the email exists in the actual db then we can worry about changing, if not it wont even show in the update form field
            if (actualPerson.email) {
                if (formInputs.email !== actualPerson.email) {
                    actualPerson.email = formInputs.email;
                }
            }
            //if the address exists in the actual db then we can worry about changing, if not it wont even show in the update form field
            //so the update form passes in a list of street, state and zip, not like a object/dictionary
            //whatever is being passed form the form changes from string to array: 
            // like if only address is there, the field is a string, 
            //but
            //if there more than one address, then the field is passed in as a array
            if (!(actualPerson.address == undefined)) {
                if (actualPerson.address.length === 1) {
                    console.log('reached to the point where the address lenght is === 1');
                    if (actualPerson.address[0].street !== formInputs.street) {
                        actualPerson.address[0].street = formInputs.street;  //now the part that is not working is if there's only one address, then the req.body.street[i] will only take the first lettter. since the req.body.street at that point will not have the address as an list so that's why.
                    }
                    if (actualPerson.address[0].state !== formInputs.state) {
                        actualPerson.address[0].state = formInputs.state;
                    }
                    //gotta make sure they actually enter correct format zipcode
                    if (actualPerson.address[0].zip !== formInputs.zip) {
                        actualPerson.address[0].zip = formInputs.zip;
                    }
                } else {
                    console.log('reached to the point where the address lenght is > 1');
                    for (let i = 0; i < actualPerson.address.length; i++) {
                        if (actualPerson.address[i].street !== formInputs.street[i]) {
                            actualPerson.address[i].street = formInputs.street[i]; 
                        }
                        if (actualPerson.address[i].state !== formInputs.state[i]) {
                            actualPerson.address[i].state = formInputs.state[i];
                        }
                        if (actualPerson.address[i].zip !== formInputs.zip[i]) {
                            actualPerson.address[i].zip = formInputs.zip[i];
                        }
                    }
                }
            }
        }
        await actualPerson.save();
        res.redirect(`/contacts/person/${actualPerson._id}`);
    } catch (err) {
        console.log(err);
    }
}