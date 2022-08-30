require('dotenv').config();
const {Pool} = require('pg');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');


const salt = bcrypt.genSaltSync(10);

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

let isExistingUser = function (name) {
  return pool
    .query(`SELECT username FROM users`)
    .then(data => {
      let listNames = data.rows.map((element) => {
        return element.username;
      })
      return listNames.includes(name);
    })
};
 let findUniqueUser = function () {
  return new Promise ((res, rej) => {
    let username = faker.internet.userName();
    res(isExistingUser(username).then((data) =>{
      if (!data) {
        return username;
      } else {
      return findUniqueUser();
      }
    }))
  })
};

const addUser =  function(username, boolean) {
  let password = bcrypt.hashSync('password', salt);
  let admin = Math.random() < 0.5;
  let user_pic = faker.internet.avatar(400, 400, true);
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
          return console.log(err.stack);
        }
        if(boolean){
          return console.log(res.rows[0]); ///mostly for debug
        }
        return;
      })
};

let addNUsers = function(times, boolean) {
  for (let i = 0; i < times; i ++){
    findUniqueUser().then(data => {
       addUser(data, boolean);
    })
  }
};

module.exports = {addNUsers};
