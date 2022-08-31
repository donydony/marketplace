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

  return db.query(query,queryParams).then(data => {
    //console.log('data.rows',data.rows);
    return data.rows;
  });
}

module.exports = {insertNewItem};
