const db = require('../connection');

const getConversation = (convo_id) => {
  return db.query(
    `SELECT * FROM conversations WHERE id = $1;`, [convo_id]
  ).then(data => {
    return data.rows;
  });
};

const getAllMessages = (convo_id) => {
  return db.query(
    `SELECT *
    FROM messages 
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

module.exports = { getAllMessages, insertMessage, getConversation };