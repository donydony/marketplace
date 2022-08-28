require('dotenv').config({path:'../../.env'});
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


userRead.then(element => {
  pool.query(element);
}).catch(err => {
  console.error(err);
});

itemsRead.then(element => {
  pool.query(element);
}).catch(err => {
  console.error(err);
});

favRead.then(element => {
  pool.query(element);
}).catch(err => {
  console.error(err);
});


convoRead.then(element => {
  pool.query(element);
}).catch(err => {
  console.error(err);
});


msgRead.then(element => {
  pool.query(element);
}).catch(err => {
  console.error(err);
});
