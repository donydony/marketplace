const db = require('../connection');

const insertNewItem = (sellerId , itemName ,imageUrl, price, type, description = '') => {
  const query = `
  INSERT INTO items (
    seller_id,
    title,
    img_url,
    price,
    type,
    description,
    date_added,
    sold_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;

  const sold = false;
  const date = new Date();

  const queryParams = [sellerId, itemName, imageUrl, price, type, description, date, sold];
  console.log('QUERY PARAMS',queryParams)

  return db.query(query,queryParams).then(data => {
    console.log('data.rows',data.rows);
    return data.rows;
  });
};

const deleteItem = (itemId) => {
  const query = `
  DELETE FROM items
  WHERE id = $1;
  `;
  const queryParams = [itemId];

  return db.query(query,queryParams).then(data => {
    console.log(`DELETED ITEM from user with id ${itemId} and item name`);
    //return data.rows;
  });
};

const getItemByID = item_id => {
  const query = `
  SELECT *
  FROM items
  WHERE id = $1;
  `;
  const queryParams = [item_id];

  return db.query(query,queryParams).then(data => {
    return data.rows;
  });
};

module.exports = {insertNewItem, deleteItem, getItemByID};
