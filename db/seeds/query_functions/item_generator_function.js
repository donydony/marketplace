require('dotenv').config();
const {Pool} = require('pg');
const { faker } = require('@faker-js/faker');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

let maxUserID = function () {
  return pool
    .query(`SELECT MAX(id) FROM users`)
    .then(data => {
      return Math.ceil(Math.random()*data.rows[0].max);//cannot have id of 0 hence Math.ceil()
    })
};

const addItems =  function(boolean, seller) {
  let title = faker.vehicle.model();
  const imgUrl = faker.image.animals(400, 400, true);
  let price = Math.floor(Number(faker.finance.amount())*100);
  let type = faker.vehicle.type();
  let description = faker.lorem.lines();
  let date =  faker.date.recent();
  let sold = Math.random() < 0.5;
  let values = [seller, title, imgUrl, price, type, description, date, sold];
  return pool
    .query(`INSERT INTO items (
      seller_id,
      title,
      img_url,
      price,
      type,
      description,
      date_added,
      sold_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, values, (err, res) => {
        if (err) {
          return console.log(err.stack);
        }
        if(boolean){
          return console.log(res.rows[0]); ///mostly for debug
        }
        return;
      })
};

let addNItems = function(times, boolean) {
  for (let i = 0; i < times; i ++){
    maxUserID().then(data => {
      addItems(boolean, data);
    })
  }
};

module.exports = {addNItems};
