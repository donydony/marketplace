require('dotenv').config();
const { urlencoded } = require('express');
const db = require('../connection');

let featuredData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
    .query(`SELECT users.id AS user_id, items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id, favourites.active AS active
    FROM items
    JOIN favourites ON favourites.item_id = items.id
    JOIN users ON items.seller_id = users.id
    ORDER BY random() OFFSET $1 LIMIT 10`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let newData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
    .query(`SELECT users.id AS user_id, items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id, favourites.active AS active
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY date_added DESC LIMIT 10 OFFSET $1`, [pageRange])
    .then(data => {
      return data.rows;
    })
};

let priceData = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
    .query(`SELECT users.id AS user_id, items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id, favourites.active AS active
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    ORDER BY price LIMIT 10 OFFSET $1`, [pageRange])
    .then(data => {
      return data.rows;
    })
  };

  let priceDataDesc = function (pageNumber) {
  let pageRange = (pageNumber - 1)*10;
  return db
  .query(`SELECT users.id AS user_id, items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id, favourites.active AS active
  FROM items
  JOIN users ON items.seller_id = users.id
  LEFT JOIN favourites ON favourites.user_id = users.id
  ORDER BY price DESC LIMIT 10 OFFSET $1`, [pageRange])
  .then(data => {
    return data.rows;
  })
};

let filterData = function (pageNumber, name, min, max, boolean) {
  let pageRange = (pageNumber - 1)*10;
  let realMin = min * 100;
  let realMax = max * 100;
  let queryString = `SELECT users.id AS user_id, items.id as item_id, sold_status, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id, favourites.active AS active
  FROM items
  JOIN users ON items.seller_id = users.id
  LEFT JOIN favourites ON favourites.user_id = users.id
  `;
  let parameters = [];
  if (name) {
    parameters.push(`username LIKE '%${name}%'`);
  }
  if(min) {
    parameters.push(`price >= ${realMin}`);
  }
  if (max) {
    parameters.push(`price <= ${realMax}`);
  }
  if (parameters.length > 0) {
    queryString = queryString + "WHERE " + parameters.join(" AND ");
  }
  queryString += " ORDER BY price"
  if (boolean) {
    queryString += " DESC";
  }
  queryString += ` LIMIT 10 OFFSET ${pageRange}`;
  console.log (queryString);
  return db
    .query(queryString)
    .then(data => {
      return data.rows;
    })
};


  module.exports = {featuredData, newData, filterData, priceData, priceDataDesc};
