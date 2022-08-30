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
      return data.rows[0].max;
    })
};
let maxItemID = function () {
  return pool
    .query(`SELECT MAX(id) FROM items`)
    .then(data => {
      return data.rows[0].max;
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

let addNConvos = function(boolean, sender, receiver, item) {
    maxUserID().then(data => {
      if(data < sender || data < receiver){
        throw 'Invalid Input!'
      }
      return maxItemID().then(data2 => {
        if(data2 < item){
          throw 'Invalid Input!'
        }
        return true;
      }).catch(err => {
        console.log(err);
      })
    }).then(data => {
      addConvos(boolean, sender, receiver, item);
    }).catch(err => {
      console.log(err);
    })
};

module.exports = {addNConvos};
