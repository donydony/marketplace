const express = require('express');
const router  = express.Router();

const {
  checkFavData,
  updateUserFavData
} = require("../db/queries/userfavs.js");

router.get('/', (req, res) => {
  res.render('user-fav');
});


router.post('/', (req, res) => {
  checkFavData(req.session.user_id, req.body.item_id).then(data => {
    return res.json(data);
  })
});

router.put('/', (req, res) => {
  updateUserFavData(req.body.favourite_id).then(data => {
    return res.json(data);
  })
});

module.exports = router;
