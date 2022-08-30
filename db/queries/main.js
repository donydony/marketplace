require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});


let featuredData = function () {
  return pool
    .query(`SELECT * FROM items ORDER BY random() LIMIT 10`)
    .then(data => {
      console.log(data.rows);
    })
};


let newData = function () {
  return pool
    .query(`SELECT * FROM items ORDER BY date_added DESC LIMIT 10`)
    .then(data => {
      console.log(data.rows);
    })
};
let userData = function (name) {
  return pool
    .query(`SELECT * FROM items ORDER BY $1 LIMIT 10`, [name])
    .then(data => {
      console.log(data.rows);
    })
};
let priceData = function () {
  return pool
    .query(`SELECT * FROM items ORDER BY price LIMIT 10`)
    .then(data => {
      console.log(data.rows);
    })
};

let priceDataDesc = function () {
  return pool
    .query(`SELECT * FROM items ORDER BY price DESC LIMIT 10`)
    .then(data => {
      console.log(data.rows);
    })
};

let priceRangeData = function (min, max) {
  return pool
    .query(`SELECT * FROM items WHERE price BETWEEN $1 AND $2 ORDER BY price LIMIT 10`, [min, max])
    .then(data => {
      console.log(data.rows);
    })
};

let priceRangeDataDesc = function (min, max) {
  return pool
    .query(`SELECT * FROM items WHERE price BETWEEN $1 AND $2 ORDER BY price DESC LIMIT 10`, [min, max])
    .then(data => {
      console.log(data.rows);
    })
};


module.exports = {featuredData, newData, userData, priceData, priceDataDesc, priceRangeData, priceRangeDataDesc}
//not yet implemented pages
