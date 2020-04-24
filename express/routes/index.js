const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Crypto = require('crypto')
function getSecureRandom() {
  const buff = Crypto.randomBytes(4);
  const hex = buff.toString("hex");
  return ( parseInt(hex,16) );
}

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/register', async function(req, res, next) {
  let id = getSecureRandom();
  try {
    await db.user.create({
      id: id,
      username: req.body.username,
      password: req.body.password
    });
    res.redirect('/')
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
