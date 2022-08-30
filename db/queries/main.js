require('dotenv').config();
const { urlencoded } = require('express');
const {Pool} = require('pg');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});


let featuredData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY random() OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};
// featuredData(1).then(data => {
//   console.log(data);
// });

let newData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY date_added DESC OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let userData = function (pageNumber, name) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY $1 OFFSET $2 LIMIT 10`, [name, pageRange])
    .then(data => {
      return data.rows;
    })
};
let priceData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY price OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceDataDesc = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY price DESC OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceRangeData = function (pageNumber, min, max) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    WHERE price BETWEEN $1 AND $2 ORDER BY price OFFSET $3 LIMIT 10`, [min, max, pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceRangeDataDesc = function (pageNumber, min, max) {
  let pageRange = (pageNumber - 1)*10;
  return pool
    .query(`
    SELECT img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    WHERE price BETWEEN $1 AND $2 ORDER BY price DESC OFFSET $3 LIMIT 10`, [min, max, pageRange])
    .then(data => {
      return data.rows;
    })
};


module.exports = {featuredData, newData, userData, priceData, priceDataDesc, priceRangeData, priceRangeDataDesc};
