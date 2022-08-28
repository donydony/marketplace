require('dotenv').config({path:'../../.env'});
const {Pool} = require('pg');
const { faker } = require('@faker-js/faker');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

const addUser =  function() {
  let username = faker.internet.userName();
  let password = faker.internet.password();
  let admin = Math.random() < 0.5;
  let user_pic = faker.internet.avatar();
  let first_name = faker.name.firstName();
  let last_name = faker.name.lastName();
  let address = faker.address.streetAddress();
  let description =  faker.company.bs();
  let values = [username, password, admin, user_pic, first_name, last_name, address, description];
  return pool
    .query(`INSERT INTO users (
      username,
      password,
      admin,
      user_pic,
      first_name,
      last_name,
      address,
      description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, values, (err, res) => {
        if (err) {
          console.log(err.stack);
        }
        console.log(res.rows[0]); ///mostly for debug
      })
};

let addNUsers = function(times) {
  for (let i = 0; i < times; i ++){
    addUser();
  }
};

module.exports = {addNUsers};
