const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/items');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  const templateVars = {
    user: user_id
  }

  res.render('post-item',templateVars);
});

router.post('/', (req,res) => {
  const user_id = req.session.user_id;
  const itemName = req.session.itemName;
  const imgUrl = req.session.imgUrl;
  const price =  req.session.price;
  const type =  req.session.type;
  const description =  req.session.description;
  //console.log(req);

  userQueries.findUserId(user_id).then(result => {
    
  });


  // itemQueries.insertNewItem(
  //   user_id,
  //   itemName,
  //   imgUrl,
  //   price,
  //   type,
  //   description
  //   )
  // .then( result => {
  //   console.log('SUCCESS added item', result);
  //   res.redirect('/post-item');
  // })

});

module.exports = router;
