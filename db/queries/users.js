const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const newUser = () => {
  
  return db.query
}

module.exports = { getUsers };
