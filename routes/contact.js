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

//DELETE  --> person contact from db
router.delete('/person/:id/deleteperson', contactController.deletePerson);

//UPDATE --> person 

module.exports = router;