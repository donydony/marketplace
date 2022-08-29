require('dotenv').config();
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
let maxItemID = function () {
  return pool
    .query(`SELECT MAX(id) FROM items`)
    .then(data => {
      return Math.ceil(Math.random()*data.rows[0].max);
    })
};

const addConvos =  function(boolean, sender, receiver, item) {
  let values = [sender, receiver, item];
  return pool
    .query(`INSERT INTO conversations (
      sender_id,
      receiver_id,
      item_id) VALUES ($1, $2, $3) RETURNING *`, values, (err, res) => {
        if (err) {
          return console.log(err.stack);
        }
        if(boolean){
          return console.log(res.rows[0]); ///mostly for debug
        }
        return;
      })
};

let addNConvos = function(times, boolean) {
  for (let i = 0; i < times; i ++){
    maxUserID().then(data => {
      return maxUserID().then(data2 => {
        return maxItemID().then(data3 => {
          return [data, data2, data3];
        })
      })
    }).then(data => {
      addConvos(boolean, data[0], data[1], data[2]);
    })
  }
};

module.exports = {addNConvos};
