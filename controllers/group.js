const { body, validationResult } = require('express-validator')
// Include models
const db = require('../models')
const User = db.User
const Group = db.Group
const Join = db.Join
const Product = db.Product

// Include date converter
const { convertDate } = require('../date-converter')
const { QueryTypes } = require('sequelize');

module.exports = {
  getViewAllGroup: (req, res) => {
    res.redirect('/')
  },  
  // advertisement
  getNewAd:(req,res) =>{
    res.render('ad', { adCSS: true, formValidation: true })
  },
  getNewPage: (req, res) => {
    res.render('new', { postFormCSS: true, formValidation: true })
  },
  postNewGroup: (req, res) => {
    // keep user input
    const { name, minNum, maxNum, deadline, addr, contactInfo,content, p_name, category, price } = req.body
    // retrieve error message from express-validator
    const errors = validationResult(req)
    // error messages exist
    if (!errors.isEmpty()) {
      return res.status(422).render('new', {
        postFormCSS: true,
        formValidation: true,
        warning: errors.array(),
        group: { name, minNum, maxNum, deadline, addr, contactInfo, content, p_name, category, price }
      })
    }
    Product.create({
      p_name,
      category,
      price
    }).then(function(newRecord){
      Group.create({
        name:name,
        minNum:minNum,
        maxNum:maxNum,
        category:category,
        content:content,
        number:0,
        deadline:deadline, 
        addr:addr, 
        contactInfo:contactInfo, 
        pid:newRecord.id,
        initiatorId: req.user.id,
      })
        .then(group => res.redirect('/'))
        .catch(error => res.status(422).json(error))
    });
  },
  getViewOneGroup:(req, res)=>{  
    var isJoined = true;

    const asyncFindJoin = async()=>{
      let findJoinRecord  = await Join.findOne({where : {C_id:req.user.id,G_id:req.params.id}});
      if (findJoinRecord === null) {
        isJoined = false;
      }
    }
    asyncFindJoin().then(()=>{
      Group.findOne({
        where: {
          id: req.params.id
        }
      })
        .then(group => {
          group.dataValues.deadline = convertDate(group.dataValues.deadline)
          Product.findOne({
            where:{
              id: group.pid
            }
          }).then(product=>{
            res.render('detail', 
            { group,product,detailCSS: true,
              isInitiator: group.initiatorId === req.user.id, 
              isFull: group.maxNum == group.number,
              isJoined})
          })
          .catch(error => res.status(422).json(error))
        })
        .catch(error => res.status(422).json(error))
    });
  },
  joinGroup:(req, res)=>{
    var joinUserId = req.user.id;
    const { groupId, initiatorId } = req.body
    // 新增Join表(userId, groupId, initId)
    Join.create({
      C_id:joinUserId,
      G_id:groupId,
      J_initiator_id:initiatorId
    })
      .then(function(){
        // group表 該筆id number ++
        Group.findOne({
          where:{
            id: groupId
          }
        }).then(group=>{
          group.number++
          return group.save()
        })
        .then(group => res.redirect(`/groups/view/${groupId}`))
        .catch(error => res.status(422).json(error))
      })
      .catch(error => res.status(422).json(error))
  },
  leaveGroup:(req,res)=>{
    // 刪除Join表中符合的c_id及g_id
    // group --
    const { groupId, initiatorId } = req.body
    Join.destroy({
      where: {
        C_id: req.user.id,
        G_id: groupId
      }
    })
      .then(function(){
        // group表 該筆id number --
        Group.findOne({
          where:{
            id: groupId
          }
        }).then(group=>{
          group.number--
          return group.save()
        })
        .then(group => res.redirect(`/groups/view/${groupId}`))
        .catch(error => res.status(422).json(error))
      })
      .catch(error => res.status(422).json(error))
  },
  deleteGroup:(req,res)=>{
    // 刪除groupId
    // 刪除Join裡面 G_id
    // 導回首頁
    Group.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(){
        Join.destroy({
          where:{
            G_id: req.params.id
          }
        })
        .then(join => res.redirect(`/`))
        .catch(error => res.status(422).json(error))
      })
      .catch(error => res.status(422).json(error))
  },
  getGroupList:(req,res)=>{
    const {groupId,initiatorId} = req.body
    const asyncFindUsers = async()=>{
      let users = await db.sequelize.query(`SELECT Fname, Lname, phone, email FROM Users Where id IN (Select C_id FROM Joins Where G_id = ${groupId})`, { type: QueryTypes.SELECT });
      return users;
    }
    const asyncFindInitiator = async()=>{
      let initiator = await User.findOne({attributes: ['Fname', 'Lname', 'phone', 'email'],where:{id:initiatorId}})
      return initiator.toJSON();
    }
    Promise.all([asyncFindUsers(), asyncFindInitiator()]).then(values => {
      var data = {
        initiator:values[1],
        users:values[0]
      }
      res.json(data);
    });
    
  }
}