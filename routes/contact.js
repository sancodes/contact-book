let express = require('express');
let router = express.Router();
let contactController = require('../controllers/contactController');

//GET --> contacts --> homepage
router.get('/', contactController.getAllContacts);

//GET --> new contact form
router.get('/new', contactController.addNewContactForm);

//POST --> save contact in the database
router.post('/new', contactController.addNewContact);

//GET  --> specific person's detail
router.get('/person/:id', contactController.getPersonDetails);

//GET --> add additional address for person
router.get('/person/:id/addaddress', contactController.getAdditionalAddressForm);

//POST --> add additional address for person
router.post('/person/:id/addaddress', contactController.addAdditionalAddress);

//DELETE --> delete specific address form person's details page   (why? GET? well, just want to update in the same page thats why)
router.delete('/person/:id/deleteaddress/:addressid', contactController.deleteSpecificAddress);

//DELETE  --> person contact from db
router.delete('/person/:id/deleteperson', contactController.deletePerson);

//GET  --> person details form to update
router.get('/person/:id/updatedetails', contactController.getUpdateContactDetails);

//UPDATE --> person update
router.put('/person/:id/updatedetails', contactController.updateContactDetails);

module.exports = router;
