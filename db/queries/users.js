const db = require('../connection');


const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const findUserName = (userName) => {
  const query = `SELECT username,password
  FROM users
  WHERE username = $1;
  `;
  const queryParams = [userName];
  return db.query(query,queryParams).then(data => {
    //console.log('data.rows',data.rows);
    return data.rows;
  });
}


module.exports = { getUsers,findUserName };
