require('dotenv').config();
const db = require('../connection');


let favData = function (userName) {
  return db
    .query(`SELECT items.id as item_id, img_url, items.sold_status, price, title, items.description AS item_description, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    WHERE users.username = $1
    LIMIT 10`, [userName])
    .then(data => {
      return data.rows;
    })
};

let MarkSoldData = function (itemName) {
  return db
    .query(`UPDATE items
    SET sold_status = true
    WHERE id = $1 RETURNING *`, [itemName])
    .then(data => {
      return data.rows;
    })
};

module.exports = {favData, MarkSoldData};
