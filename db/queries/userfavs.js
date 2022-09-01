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



let updateUserFavData = function (user, item) {

  console.log(user, item);
return db.query(`SELECT COUNT(*) FROM favourites
WHERE user_id = $1 AND item_id = $2`, [user, item])
  .then(data => {
    if (data.rows[0].count === 1) {
      return db.query(`UPDATE favourites
      SET active =  NOT active
      WHERE id = $1 RETURNING *`, [favid])
      .then(data => {
        return data.rows;
      })
    }
    let values = [user, item];
    return db.query(`INSERT INTO favourites (
      user_id,
      item_id,
      active) VALUES ($1, $2, true) RETURNING *`, values)
      .then(data => {
        return data.rows;
      })
    });
    };


module.exports = {favData, MarkSoldData, updateUserFavData};
