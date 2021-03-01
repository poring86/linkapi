

const express = require('express')
const router = new express.Router()

const AppController = require('./controllers/AppController')


// Get all deals from pipedrive with status won

router.get('/deals', AppController.getDeals)

// Send deals with won status from pipedrive to bling
router.get('/send-bling', AppController.sendBling)

// Get all requests from bling
router.get('/bling-pedidos', AppController.getBling)

// Test xml
router.get('/xml-test', AppController.testXml)

// List the total amount by days from MongoDB
router.get('/total', AppController.total)

module.exports = router