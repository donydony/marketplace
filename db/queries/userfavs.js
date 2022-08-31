require('dotenv').config();
const db = require('../connection');


let favData = function (userName) {
  return db
    .query(`SELECT items.id as item_id, img_url, price, title, items.description AS item_description, favourites.id AS favourites_id
    FROM items
    JOIN users ON items.seller_id = users.id
    LEFT JOIN favourites ON favourites.user_id = users.id
    WHERE users.username = $1
    LIMIT 10`, [userName])
    .then(data => {
      return data.rows;
    })
};

// let featuredData = function (pageNumber) {
//   let pageRange = (pageNumber - 1)*10;
//   return db
//     .query(`SELECT items.id as item_id, img_url, price, title, items.description AS item_description, users.user_pic, users.username, favourites.id AS favourites_id
//     FROM items
//     JOIN users ON items.seller_id = users.id
//     LEFT JOIN favourites ON favourites.user_id = users.id
//     ORDER BY random() OFFSET $1 LIMIT 10`, [pageRange])
//     .then(data => {
//       return data.rows;
//     })
// };

module.exports = {favData};
