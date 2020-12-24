const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

// Include user model
const db = require('../models')
const User = db.User

module.exports = {
  getLogin: (req, res) => {
    res.render('login', { userCSS: true, formValidation: true })
  },
  getRegister: (req, res) => {
    res.render('register', { userCSS: true, formValidation: true })
  },
  postRegister: (req, res) => {
    const { Fname, Lname, address, phone, Birth, email, gender, password, password2 } = req.body    // retrieve error message from req
    const errors = validationResult(req)
    // validation failed
    if (!errors.isEmpty()) {
      return res.status(422).render('register', {
        userCSS: true,
        formValidation: true,
        warning: errors.array(),
        registerData: { Fname, Lname, address, phone, Birth, email, gender, password, password2}
      })
    }
    // validation passed
    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (user) {
          console.log('User already exists')
          res.render('register', { registerData: { Fname, Lname, address, phone, Birth, email, gender, password, password2} })
        } else {
          try {
            //create hashed password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            // create new user
            const newUser = new User({
              Fname, 
              Lname,
              address, 
              phone, 
              Birth, 
              email, 
              gender,
              email,
              password: hash
            })
            newUser
              .save()
              .then(user => res.redirect('/users/login'))
              .catch(err => console.log(err))
          } catch (error) {
            console.log(error)
          }
        }
      })
  },
  getLogout: (req, res) => {
    req.logout()
    req.flash('success', 'Log out successfully, see you next time :)')
    res.redirect('/users/login')
  },
  getAccount:(req,res) =>{
    res.render('account', { accountCSS: true, formValidation: true })
  }
}
