const db = require('../connection');

const getUserBuyConvos = (user_id) => {
  return db.query(
    `SELECT items.id as item_id, conversations.sender_id as seller_id, users.username as seller_username, users.user_pic as seller_pic, items.img_url as item_pic, items.price as item_price, items.title as item_title, conversations.id as convo_id
    FROM conversations
    JOIN users ON users.id = conversations.sender_id
    JOIN items ON conversations.item_id = items.id
    WHERE receiver_id = $1;`, [user_id]
  ).then(data => {
    return data.rows;
  });
};

const getUserSellConvos = (user_id) => {
  return db.query(
    `SELECT items.id as item_id, conversations.receiver_id as buyer_id, users.username as buyer_username, users.user_pic as buyer_pic, items.img_url as item_pic, items.price as item_price, items.title as item_title, conversations.id as convo_id
    FROM conversations
    JOIN users ON users.id = conversations.receiver_id
    JOIN items ON conversations.item_id = items.id
    WHERE sender_id = $1;`, [user_id]
  ).then(data => {
    return data.rows;
  });
};

module.exports = { getUserBuyConvos, getUserSellConvos };