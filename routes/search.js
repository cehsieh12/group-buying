const express = require('express')
const router = express.Router()
// Include isAuthenticated module
const { isAuthenticated } = require('../config/auth')
// Include controller
const searchController = require('../controllers/search')

router.get('/area', searchController.getSearchArea)
router.get('/date', searchController.getSearchDate)
router.get('/category', searchController.getSearchCategory)


module.exports = router