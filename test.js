const moment = require ('moment');
const tz = require('moment-timezone');
let timezone = "Asia/Taipei";
// const timeString = "2019-04-07 02:00:00";
// let now = moment(timeString,'YYYY-MM-DD hh:mm:ss');
// let utcTime = moment(timeString).utc();
// let jpTime = moment(timeString,'YYYY-MM-DDThh:mm:ss').tz(timezone);
// let jpTimeTz = moment.tz(timeString,'YYYY-MM-DDThh:mm:ss',timezone);
console.log(moment().tz('Asia/Taipei').format());
// console.log(now);
// console.log(utcTime);
// console.log(jpTime);
// console.log(jpTimeTz);