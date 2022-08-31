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

const findUserId = (userName) => {
  const query = `
  SELECT id
  FROM users
  WHERE username = $1
  `;
  const queryParams = [userName];

  return db.query(query,queryParams).then(data => {
    return data.rows;
  });
}

const insertNewUser = (userName, password, firstName, lastName, userPic, address, aboutMe) => {
  const query = `
  INSERT INTO users (
    username,
    password,
    admin,
    user_pic,
    first_name,
    last_name,
    address,
    description)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *`;

  const admin = false;
  const queryParams = [userName, password, admin, firstName, lastName, userPic, address, aboutMe];

  return db.query(query,queryParams).then(data => {return data.rows});
}


module.exports = { getUsers,findUserName,insertNewUser,findUserId};
