require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});


let featuredData = function (pageNumber) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items ORDER BY random() OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};


let newData = function (pageNumber) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items ORDER BY date_added DESC OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};
let userData = function (pageNumber, name) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items ORDER BY $1 OFFSET $2 LIMIT 10`, [name, pageRange])
    .then(data => {
      return data.rows;
    })
};
let priceData = function (pageNumber) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items ORDER BY price OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceDataDesc = function (pageNumber) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items ORDER BY price DESC OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceRangeData = function (pageNumber, min, max) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items WHERE price BETWEEN $1 AND $2 ORDER BY price OFFSET $3 LIMIT 10`, [min, max, pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceRangeDataDesc = function (pageNumber, min, max) {
  let pageRange = pageNumber*10;
  return pool
    .query(`SELECT * FROM items WHERE price BETWEEN $1 AND $2 ORDER BY price DESC OFFSET $3 LIMIT 10`, [min, max, pageRange])
    .then(data => {
      return data.rows;
    })
};


module.exports = {featuredData, newData, userData, priceData, priceDataDesc, priceRangeData, priceRangeDataDesc}
