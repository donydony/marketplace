const db = require('../connection');

const getAllMessages = (convo_id) => {
  return db.query(
    `SELECT messages.message, messages.sender_id, conversations.sender_id as convo_sender_id, receiver_id, messages.sender_id = conversations.sender_id as isSender, items.title as item_title, st.user_pic as sender_pic, rt.user_pic as receiver_pic, st.username as sender_username, rt.username as receiver_username, conversation_id as convo_id
    FROM messages 
    JOIN conversations ON conversations.id = conversation_id
    JOIN users st ON st.id = conversations.sender_id 
    JOIN users rt ON rt.id = conversations.receiver_id 
    JOIN items ON item_id = items.id 
    WHERE conversation_id = $1 
    ORDER BY time_created;`, [convo_id])
    .then(data => {
      return data.rows;
    });
};

const insertMessage = (convo_id, sender_id, msg) => {
  return db.query(
    `INSERT INTO messages (
      conversation_id,
      sender_id,
      time_created,
      message) VALUES ($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *`, [convo_id, sender_id, msg]).then(data => {
    return data.rows;
  });
};

module.exports = { getAllMessages, insertMessage };