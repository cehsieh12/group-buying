const { body } = require('express-validator')
module.exports = {
  newPost: [
    // validate name field
    body('name')
      .isLength({ min: 1})
      .withMessage('Group name is required'),
    // Number of People
    body('minNum')
      .isInt({ gt: 0 })
      .withMessage('At least 1 person'),
    body('maxNum')
      .isInt({ gt: 0 })
      .custom((value, { req }) => {
        if (value < req.body.minNum) {
          throw new Error('Max number of people should be greater than min number of people')
        }
        return true
      }),
    // check dueDate field
    body('deadline')
      .isAfter(new Date().toDateString())
      .withMessage('DeadLine Date should be after today!')
  ],

  registerUser: [
    // body('Fname')
    //   .isLength({ min: 1, max: 10 })
    //   .withMessage('First Name is required, max 10 letters'),
    // body('Lname')
    //   .isLength({ min: 1, max: 10 })
    //   .withMessage('Last Name is required, max 10 letters'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .custom(value => {
        const regex = /^\S{8,12}$/
        const result = value.match(regex)
        if (!result) {
          throw new Error('Password length must be between 8-12')
        }
        return true
      }),
    body('password2')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password does not matched')
        }
        return true
      })
  ]
}