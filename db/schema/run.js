require('dotenv').config();
const {Pool} = require('pg');
const fs = require('fs');

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

let userRead = new Promise ((res, rej) => {
  fs.readFile('./table creation queries/01_users.sql', 'utf8', (err, data) => {
    if (err) {
      return rej(err);
    }
    return res(data);
  })
});

let itemsRead = new Promise ((res, rej) => {
  fs.readFile('./table creation queries/02_items.sql', 'utf8', (err, data) => {
    if (err) {
      return rej (err);
    }
    return res(data);
  })
});

let favRead = new Promise ((res, rej) => {
  fs.readFile('./table creation queries/03_favourites.sql', 'utf8', (err, data) => {
    if (err) {
      return rej (err);
    }
    return res(data);
  })
});


let convoRead = new Promise ((res, rej) => {
  fs.readFile('./table creation queries/04_conversations.sql', 'utf8', (err, data) => {
    if (err) {
      return rej (err);
    }
    return res(data);
  })
});


let msgRead = new Promise ((res, rej) => {
  fs.readFile('./table creation queries/05_messages.sql', 'utf8', (err, data) => {
    if (err) {
      return rej (err);
    }
    return res(data);
  })
});

let all = "";

userRead.then(element => {
  return all += element;
}).then(all => {
  return itemsRead.then(element => {
    return all += element;
  })
}).then(all => {
  return favRead.then(element => {
    return all += element;
  })
}).then(all => {
  return convoRead.then(element => {
    return all += element;
  })
}).then(all => {
  return msgRead.then(element => {
    return all += element;
  })
}).then(all => {
  pool.query(all);
}).catch(err => {
  console.error(err);
});

