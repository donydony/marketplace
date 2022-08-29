const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const newEmail = req.body.email;
  const password = req.body.password;
  req.session.user_id = 1;
  res.redirect('/');
});


module.exports = router;
