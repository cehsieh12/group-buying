const express = require('express')
const router = express.Router()

// Include server-side validation
const validation = require('../express-validator')
// Include isAuthenticated module
const { isAuthenticated } = require('../config/auth')

// Include Controller
const groupController = require('../controllers/group')

router.get('/', isAuthenticated, groupController.getViewAllGroup)
// advertisement
router.get('/ad', groupController.getNewAd)

// render new group form page
router.get('/new', isAuthenticated, groupController.getNewPage)

// submit new group
router.post('/new', isAuthenticated, validation.newPost, groupController.postNewGroup)

// show one post
router.get('/view/:id', isAuthenticated, groupController.getViewOneGroup)

// Join group 
router.post('/join/:id', isAuthenticated, groupController.joinGroup)

// Leave group
router.post('/leave/:id', isAuthenticated, groupController.leaveGroup)

// Delete group 
router.delete('/delete/:id', isAuthenticated, groupController.deleteGroup)

// Get Group List
router.post('/list/:id',isAuthenticated ,groupController.getGroupList)

module.exports = router