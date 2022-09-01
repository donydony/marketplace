require('dotenv').config();
const {Pool} = require('pg');

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

const addFavs =  function(boolean, user, item) {
  let active = Math.random() < 0.5;
  let values = [user, item, active];
  return pool
    .query(`INSERT INTO favourites (
      user_id,
      item_id,
      active) VALUES ($1, $2, $3) RETURNING *`, values, (err, res) => {
        if (err) {
          return console.log(err.stack);
        }
        if(boolean){
          return console.log(res.rows[0]); ///mostly for debug
        }
        return;
      })
};

let addNFavs = function(times, boolean) {
  for (let i = 0; i < times; i ++){
    maxUserID().then(data => {
      return maxItemID().then(data2 => {
        return [data, data2];
      })
    }).then(data => {
      addFavs(boolean, data[0], data[1]);
    })
  }
};

module.exports = {addNFavs};
