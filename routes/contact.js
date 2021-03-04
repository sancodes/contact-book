let express = require('express');
let router = express.Router();
let contactController = require('../controllers/contactController');

//GET --> contacts --> homepage
router.get('/', contactController.getAllContacts);

//GET --> new contact form

//POST --> save contact in the database

//GET  --> specific person's detail

//DELETE  --> person contact from db

//UPDATE --> person 

module.exports = router;