const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

// Include user model
const db = require('../models')
const User = db.User
const Group = db.Group
const Join = db.Join
const { QueryTypes } = require('sequelize');

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
              password: hash,
              amount:0
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
    var uid = req.params.uid;
    console.log(uid);
    // 取得User資料
    // 取得Group表中initiatorId為此uid的資料
    // 取得Join表中C_id有此uid的資料 再join Group表
    const asyncFindUsers = async()=>{
      let user = await User.findOne({where:{id:uid}});
      return user.toJSON();
    }
    const asyncFindInitGroups = async()=>{
      let initGroups = await db.sequelize.query(`SELECT * FROM Groups WHERE initiatorId = ${uid}`, { type: QueryTypes.SELECT })
      return initGroups;
    }

    // SELECT * FROM Groups Where id IN (Select G_id FROM Joins Where C_id = 2);
    const asyncFindJoinGroups = async()=>{
      let joinGroups = await db.sequelize.query(`SELECT * FROM Groups WHERE id IN (Select G_id FROM Joins Where C_id = ${uid})`, { type: QueryTypes.SELECT });
      return joinGroups;
    }
    Promise.all([asyncFindUsers(), asyncFindInitGroups(),asyncFindJoinGroups()]).then(values => {
      var user = values[0]
      var initGroups = values[1]
      var joinGroups = values[2]
      res.render('account', { accountCSS: true, formValidation: true, user,initGroups,joinGroups, noInitGroup: initGroups.length === 0, nojoinGroup: joinGroups.length === 0 })
    });

  }
}
