// Include models
const db = require('../models')
const Group = db.Group
// Include date converter
const { convertDate } = require('../date-converter')
const moment = require ('moment');

// Include sequelize operator
const Op = require('sequelize').Op

module.exports = {
    getSearchArea:(req,res)=>{
        const area = req.query.area;
        Group.findAll({
            where: {
                addr: area,
                deadline:{
                    [Op.gt]: moment().tz('Asia/Taipei').format()
                },
                number:{
                  [Op.ne]: db.sequelize.col('maxNum')
                }
            },
            order: [['deadline', 'ASC']]
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
    },
    getSearchDate:(req,res)=>{
        let date = req.query.date;
        date = date === 'Furthest date'? 'DESC':'ASC';
        Group.findAll({
            where: {
                deadline:{
                    [Op.gt]: moment().tz('Asia/Taipei').format()
                },
                number:{
                  [Op.ne]: db.sequelize.col('maxNum')
                }
            },
            order: [['deadline', date]]
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
    },
    getSearchCategory:(req,res)=>{
        const category = req.query.category;
        Group.findAll({
            where: {
                category: category,
                deadline:{
                    [Op.gt]: moment().tz('Asia/Taipei').format()
                },
                number:{
                  [Op.ne]: db.sequelize.col('maxNum')
                }
            },
            order: [['deadline', 'ASC']]
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