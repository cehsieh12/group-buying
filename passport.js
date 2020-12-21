const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
// Include user model
const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          return done(null, false, req.flash('warning', 'This email is not registered'))
        }
        // use bcrypt to check password correction
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
          return done(null, false, req.flash('warning', 'Email or password incorrect'))
        }
        // if password matched
        return done(null, user)
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.Useid)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
  })
}