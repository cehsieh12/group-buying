const db = require('../models')
const moment = require('moment-timezone');
const User = db.User
const Group = db.Group
// Include date converter
const { convertDate } = require('../date-converter')
const { Op } = require("sequelize");
module.exports = {
  getHome: (req, res) => {
    Group.findAll({
      where: {
        deadline:{
          [Op.gt]: moment().tz("Asia/Taipei").format('YYYY-MM-DD')
        }
      },
      order: [['deadline', 'DESC']]
    })
      .then(groups => {
        // Filter option for all unique date
        const dateOptions = []
        groups.forEach(group => {
          // convert date
          const convertedDate = convertDate(group.dataValues.deadline)
          // Add unique date to date filter
          if (!dateOptions.includes(convertedDate)) { dateOptions.push(convertedDate) }
          // convert all displayed date
          group.dataValues.deadline = convertedDate
        })
        res.render('index', { groups, indexCSS: true, dateOptions, noPost: groups.length === 0, hasAnimation: true, helpers: {
          progressBar: function (current,max) { return ((current/max)*100).toFixed(1); }
      } })
      })
      .catch(error => res.status(422).json(error))
  }
}