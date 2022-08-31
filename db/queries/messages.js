const db = require('../connection');

const getAllMessages = (convo_id) => {
  return db.query(`SELECT * FROM messages WHERE conversation_id = $1;`, [convo_id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllMessages };