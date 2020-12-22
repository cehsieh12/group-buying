const { body, validationResult } = require('express-validator')
// Include post and user models
const db = require('../models')
const User = db.User
const Post = db.Post
// Include date converter
const { convertDate } = require('../date-converter')

module.exports = {
  getViewAllPost: (req, res) => {
    res.redirect('/')
  },
  getNewPost: (req, res) => {
    res.render('new', { postFormCSS: true, formValidation: true })
  },
  // advertisement
  getNewAd:(req,res) =>{
    res.render('ad', { adCSS: true, formValidation: true })
  },
  postNewPost: (req, res) => {
    // keep user input
    const { title, content, numberOfPeople, category, initiatorId, dueDate } = req.body
    // retrieve error message from express-validator
    const errors = validationResult(req)
    // one or more error messages exist
    if (!errors.isEmpty()) {
      return res.status(422).render('new', {
        postFormCSS: true,
        formValidation: true,
        warning: errors.array(),
        post: { title, content, numberOfPeople, category, initiatorId, dueDate }
      })
    }

    // pass validation
    Post.create({
      title,
      content,
      numberOfPeople,
      initiatorId: req.user.id,
      dueDate
    })
      .then(post => res.redirect('/'))
      .catch(error => res.status(422).json(err))
  }

}