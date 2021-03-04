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

//DELETE  --> person contact from db

//UPDATE --> person 

module.exports = router;