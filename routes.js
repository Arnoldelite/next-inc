const express = require('express');
// const auth = require("./middleware/auth");


// Controllers
const resourceController = require('./controllers/resourceController');

const router = express.Router();

// Resource Routes
router.get( '/resources', resourceController.getAllResources );
router.get( '/resource/:id', resourceController.getResource );
router.post( '/resource', resourceController.saveResource );
router.delete( '/venue/:id', resourceController.deleteResource );



module.exports = router;