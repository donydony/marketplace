const express = require('express');
const router  = express.Router();

const {
  updateUserFavData
} = require("../db/queries/userfavs.js");

router.get('/', (req, res) => {
  res.render('user-fav');
});

router.put('/', (req, res) => {
  console.log(req.body);
  updateUserFavData(req.body.user_id, req.body.item_id).then(data => {
    return res.json(data);
  })
});

module.exports = router;
