'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fname: {
        allowNull: false,
        type: Sequelize.STRING,
        // validate:{
	      //   len: [1,10],              //名字長度範圍1-10
        // }
      },
      Lname: { 
        allowNull: false,
        type: Sequelize.STRING,
        // validate:{
	      //   len: [1,10]               //姓氏長度範圍1-10
        // }
      },
      address: { 
        type: Sequelize.STRING      //地址為非必填
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,      
        // validate:{
        //   isNumeric: true,          //只允許數字
        //   len: [8,10],              //手機為10碼,市話為8-10碼,故設為8-10碼
        // }
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        // validate:{
	      //   isEmail: true,    //驗證是否是信箱格式
        // }
      },
      birth: {
        allowNull: false,
        type: Sequelize.STRING,
        // validate:{
	      //   isDate: true,     //驗證是否是有效日期
        // }
      },
      sex: {
        allowNull: false,
        type: Sequelize.STRING
        // type: Sequelize.ENUM(['men', 'women', 'X']), //性别只能是“男,女,X”的其中一個
        // defaultValue: 'X',                           //預設為X
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        // validate:{
	      //   len: [8,12],              //密碼長度範圍8-12
        // }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};