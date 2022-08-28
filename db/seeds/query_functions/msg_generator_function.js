require('dotenv').config({path:'../../.env'});
const {Pool} = require('pg');
const { faker } = require('@faker-js/faker');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

let maxUserID = function () {
  return pool
    .query(`SELECT MAX(id) FROM users`)
    .then(data => {
      return Math.ceil(Math.random()*data.rows[0].max);
    })
};
let maxConvoID = function () {
  return pool
    .query(`SELECT MAX(id) FROM conversations`)
    .then(data => {
      return Math.ceil(Math.random()*data.rows[0].max);
    })
};

const addMsgs =  function(boolean, sender, convo) {
  let values = [convo, sender];
  return pool
    .query(`INSERT INTO messages (
      conversation_id,
      sender_id,
      time_created) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *`, values, (err, res) => {
        if (err) {
          return console.log(err.stack);
        }
        if(boolean){
          return console.log(res.rows[0]); ///mostly for debug
        }
        return;
      })
};

let addNMsgs = function(times, boolean) {
  for (let i = 0; i < times; i ++){
    maxUserID().then(data => {
      return maxConvoID().then(data2 => {
        return [data, data2];
      })
    }).then(data => {
      addMsgs(boolean, data[0], data[1]);
    })
  }
};

module.exports = {addNMsgs};
