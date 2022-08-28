require('dotenv').config({path:'../../.env'});
const {Pool} = require('pg');
const { faker } = require('@faker-js/faker');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

let userCap;
let convoCap;
let maxUserID = function () {
  return pool
    .query(`SELECT MAX(id) FROM users`)
    .then(data => {
      userCap = data.rows[0].max;
      return Math.ceil(Math.random()*data.rows[0].max);
    })
    .catch(err => {
      console.error(err);
    })
};
let maxConvoID = function () {
  return pool
    .query(`SELECT MAX(id) FROM conversations`)
    .then(data => {
      convoCap = data.rows[0].max;
      return Math.ceil(Math.random()*data.rows[0].max);
    })
    .catch(err => {
      console.error(err);
    })
};

const addMsgs =  function(boolean, sender, convo, forceSender, forceConvo) {
  let a = sender;
  if (Number.isInteger(forceSender) && forceSender <= userCap){
    a = forceSender;
  }
  let b = convo;
  if (Number.isInteger(forceConvo) && forceConvo <= convoCap){
    b = forceConvo;
  }
  let text = faker.lorem.paragraph(3);
  let values = [b, a, text];
  return pool
    .query(`INSERT INTO messages (
      conversation_id,
      sender_id,
      time_created,
      message) VALUES ($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *`, values, (err, res) => {
        if (err) {
          return console.log(err.stack);
        }
        if(boolean){
          return console.log(res.rows[0]); ///mostly for debug
        }
        return;
      })
};

let addNMsgs = function(times, boolean, sender_id, convo_id) {
  for (let i = 0; i < times; i ++){
    maxUserID().then(data => {
      return maxConvoID().then(data2 => {
        return [data, data2];
      })
    }).then(data => {
      addMsgs(boolean, data[0], data[1], sender_id, convo_id);
    }).catch(err => {
      console.error(err);
    })
  }
};

module.exports = {addNMsgs};


