const express = require('express')
const router = express.Router()
const formsController = require('../controllers/formsController')

router.route('/')
    .get(formsController.getAllForms)
    .post(formsController.createNewForm)
router.route("/:formId").get(formsController.getSpecificFormById)

module.exports = router