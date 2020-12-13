// Include user and todo models
const db = require('../models')
const User = db.User
const Post = db.Post
// Include date converter
const { convertDate } = require('../date-converter')

module.exports = {
  getHome: (req, res) => {
    Post.findAll({
      order: [['dueDate', 'DESC']]
    })
      .then(posts => {
        // Filter option for all unique date
        const dateOptions = []
        posts.forEach(post => {
          // convert date
          const convertedDate = convertDate(post.dataValues.dueDate)
          // Add unique date to date filter
          if (!dateOptions.includes(convertedDate)) { dateOptions.push(convertedDate) }
          // convert all displayed date
          post.dataValues.dueDate = convertedDate
        })
        res.render('index', { posts, indexCSS: true, dateOptions, noPost: posts.length === 0, hasAnimation: true })
      })
      .catch(error => res.status(422).json(error))
  }
}